import { NotFoundException } from "../../common/utils/catch-errors";
import SessionModel from "../../database/models/session.model";

export class SessionService {
  // --------------- GET ALL SESSION ---------------
  public async getAllSession(userId: string) {
    const sessions = await SessionModel.find(
      {
        userId,
        expiredAt: { $gt: Date.now() },
      },
      {
        _id: 1,
        userId: 1,
        userAgent: 1,
        createdAt: 1,
        expiredAt: 1,
      },
      {
        sort: {
          createdAt: -1,
        },
      }
    );

    return {
      sessions,
    };
  }

  // --------------- GET SESSION BY ID ---------------
  public async getSessionById(sessionId: string) {
    const session = await SessionModel.findById(sessionId)
      .populate("userId")
      .select("-expiresAt");

    if (!session) {
      throw new NotFoundException("Không tìm thấy phiên làm việc");
    }
    const { userId: user } = session;

    return {
      user,
    };
  }

  // --------------- DELETE SESSION ---------------
  public async deleteSession(sessionId: string, userId: string) {
    const deletedSession = await SessionModel.findByIdAndDelete({
      _id: sessionId,
      userId: userId,
    });
    if (!deletedSession) {
      throw new NotFoundException("Không tìm thấy phiên làm việc");
    }
    return;
  }
}
