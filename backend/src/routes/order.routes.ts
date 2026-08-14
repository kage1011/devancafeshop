import { Router } from "express";

import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  confirmOrderController,
  startPreparingOrderController,
  readyOrderController,
  completeOrderController,
  cancelOrderController,
} from "../controllers/order.controller";

const router = Router();
router.post("/", createOrderController);
router.get("/", getOrdersController);
router.get("/:id", getOrderByIdController);
router.patch("/:id/status", updateOrderStatusController);
router.post("/:id/confirm", confirmOrderController);
router.post("/:id/preparing", startPreparingOrderController);
router.post("/:id/ready", readyOrderController);
router.post("/:id/complete", completeOrderController);
router.post("/:id/cancel", cancelOrderController);

export default router;
