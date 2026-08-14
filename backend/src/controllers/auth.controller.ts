import { Request, Response, NextFunction } from "express";
import { login, register } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = registerSchema.parse(req.body);

    const user = await register(data);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await login(data);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
export async function meController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
}
