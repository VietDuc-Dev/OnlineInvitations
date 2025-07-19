import { Request } from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import UserModel from "../../database/models/user.model";
import SessionModel from "../../database/models/session.model";
import { refreshTokenSignOptions, signJwtToken } from "../../common/utils/jwt";

export class MfaService {
  // --------------- GENERATE MFA SETUP ---------------
  public async generateMFASetup(req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("Người dùng chưa xác thực");
    }

    if (user.userPreferences.enable2FA) {
      return {
        message: "MFA đã được kích hoạt",
      };
    }

    let secretKey = user.userPreferences.twoFactorSecret;
    if (!secretKey) {
      const secret = speakeasy.generateSecret({ name: "Squeezy" });
      secretKey = secret.base32;
      user.userPreferences.twoFactorSecret = secretKey;
      await user.save();
    }

    const url = speakeasy.otpauthURL({
      secret: secretKey,
      label: `${user.username}`,
      issuer: "squeezy.com",
      encoding: "base32",
    });

    const qrImageUrl = await qrcode.toDataURL(url);

    return {
      message: "Quét mã QR hoặc sử dụng khóa.",
      secret: secretKey,
      qrImageUrl,
    };
  }

  // --------------- VERIFY MFA SETUP ---------------
  public async verifyMFASetup(req: Request, code: string, secretKey: string) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("Người dùng chưa xác thực");
    }

    if (user.userPreferences.enable2FA) {
      return {
        message: "MFA đã được kích hoạt trước đó",
        userPreferences: {
          enable2FA: user.userPreferences.enable2FA,
        },
      };
    }

    const isValid = speakeasy.totp.verify({
      secret: secretKey,
      encoding: "base32",
      token: code,
    });

    if (!isValid) {
      throw new BadRequestException("Mã code không hợp lệ. Vui lòng thử lại.");
    }

    user.userPreferences.enable2FA = true;
    await user.save();

    return {
      message: "MFA thiết lập thành công",
      userPreferences: {
        enable2FA: user.userPreferences.enable2FA,
      },
    };
  }

  // --------------- REVOKE MFA ---------------
  public async revokeMFA(req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("Người dùng chưa xác thực");
    }

    if (!user.userPreferences.enable2FA) {
      return {
        message: "MFA chưa được kích hoạt",
        userPreferences: {
          enable2FA: user.userPreferences.enable2FA,
        },
      };
    }

    user.userPreferences.twoFactorSecret = undefined;
    user.userPreferences.enable2FA = false;
    await user.save();

    return {
      message: "MFA xóa thành công",
      userPreferences: {
        enable2FA: user.userPreferences.enable2FA,
      },
    };
  }

  // --------------- VERIFY MFA FOR LOGIN ---------------
  public async verifyMFAForLogin(
    code: string,
    email: string,
    userAgent?: string
  ) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new NotFoundException("Người dùng không tồn tại");
    }

    if (
      !user.userPreferences.enable2FA &&
      !user.userPreferences.twoFactorSecret
    ) {
      throw new UnauthorizedException("MFA không trùng khớp");
    }

    const isValid = speakeasy.totp.verify({
      secret: user.userPreferences.twoFactorSecret!,
      encoding: "base32",
      token: code,
    });

    if (!isValid) {
      throw new BadRequestException("Mã code không hợp lệ. Vui lòng thử lại.");
    }

    //sign access token & refresh token
    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session._id,
      },
      refreshTokenSignOptions
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
