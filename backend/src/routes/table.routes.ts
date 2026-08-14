import { Router } from "express";

import {
  createTableController,
  getTablesController,
  getAvailableTablesController,
  getTableAreasController,
  getTableByIdController,
  updateTableController,
  deleteTableController,
  updateTableStatusController,
} from "../controllers/table.controller";

const router = Router();

router.post("/", createTableController);
router.get("/available", getAvailableTablesController);
router.get("/areas", getTableAreasController);
router.get("/", getTablesController);
router.get("/:id", getTableByIdController);
router.put("/:id", updateTableController);
router.delete("/:id", deleteTableController);
router.patch("/:id/status", updateTableStatusController);

export default router;
