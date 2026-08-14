import { Router } from "express";

import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  updateProductStatusController,
} from "../controllers/product.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);
router.patch("/:id/status", updateProductStatusController);

export default router;
