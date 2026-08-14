import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT || 3000),

  nodeEnv: process.env.NODE_ENV || "development",

  mongodbUri: getEnv("MONGODB_URI"),

  jwtAccessSecret: getEnv("JWT_ACCESS_SECRET"),

  jwtRefreshSecret: getEnv("JWT_REFRESH_SECRET"),

  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",

  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
};