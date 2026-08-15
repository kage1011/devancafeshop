import { Router } from "express";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import tableRoutes from "./table.routes";



export const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/tables", tableRoutes);
router.use("/orders", orderRoutes);

