import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import { HTTPSTATUS } from "./config/http.config";
import connectDatabase from "./database/db";
import { errorHandler } from "./middlewares/errorHandler";
import { BadRequestException } from "./common/utils/catch-errors";
import { ErrorCode } from "./common/enums/error-code.enum";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException(
      "Bad request",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
    res.status(HTTPSTATUS.OK).json({
      message: "Online Invitation!!!",
    });
  })
);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
