import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  role: string;
}

export function generateAccessToken(
  payload: JwtPayload
): string {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn as jwt.SignOptions["expiresIn"]
  });
}

export function generateRefreshToken(
  payload: JwtPayload
): string {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn as jwt.SignOptions["expiresIn"]
  });
}

export function verifyAccessToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    env.jwtAccessSecret
  ) as JwtPayload;
}