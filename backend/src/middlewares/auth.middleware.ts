import {
  Request,
  Response,
  NextFunction
} from "express";

import { verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest
  extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    const [type, token] =
      authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
    }

    const payload =
      verifyAccessToken(token);

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}