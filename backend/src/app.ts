import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { router } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Cafe Backend is running"
  });
});

app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;