import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { SessionService } from "./session.service";
import { HTTPSTATUS } from "../../config/http.config";
import { NotFoundException } from "../../common/utils/catch-errors";
import z from "zod";

export class SessionController {
  private sessionService: SessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  // --------------- GET ALL SESSION ---------------
  public getAllSession = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const { sessions } = await this.sessionService.getAllSession(userId);

    const modifySessions = sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === sessionId && {
        isCurrent: true,
      }),
    }));

    return res.status(HTTPSTATUS.OK).json({
      message: "Lấy tất cả phiên làm việc thành công",
      sessions: modifySessions,
    });
  });

  // --------------- GET SESSION BY ID ---------------
  public getSession = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req?.sessionId;

    if (!sessionId) {
      throw new NotFoundException(
        "Không tìm thấy phiên làm việc. Vui lòng đăng nhập."
      );
    }

    const { user } = await this.sessionService.getSessionById(sessionId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Phiên làm việc của bạn",
      user,
    });
  });

  // --------------- DELETE SESSION ---------------
  public deleteSession = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = z.string().parse(req.params.id);
    const userId = req.user?.id;
    await this.sessionService.deleteSession(sessionId, userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Xóa phiên làm việc thành công",
    });
  });
}
