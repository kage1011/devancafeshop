import bcrypt from "bcryptjs";

import { User, UserRole } from "../models/user.model.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

interface RegisterInput {
  username: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: UserRole;
}

interface LoginInput {
  username: string;
  password: string;
}

export async function register(input: RegisterInput) {
  const existingUser = await User.findOne({
    username: input.username.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await User.create({
    username: input.username.toLowerCase(),
    passwordHash,
    fullName: input.fullName,
    phone: input.phone,
    role: input.role || UserRole.STAFF,
  });

  return {
    id: user._id.toString(),
    username: user.username,
    fullName: user.fullName,
    role: user.role,
  };
}

export async function login(input: LoginInput) {
  const user = await User.findOne({
    username: input.username.toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  if (!user.isActive) {
    throw new Error("User is inactive");
  }

  const passwordValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!passwordValid) {
    throw new Error("Invalid username or password");
  }

  const payload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,

    user: {
      id: user._id.toString(),
      username: user.username,
      fullName: user.fullName,
      role: user.role,
    },
  };
}
