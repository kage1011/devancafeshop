import { Request, Response } from "express";

import {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
  updateTableStatus,
  getAvailableTables,
  getTableAreas,
} from "../services/table.service";

import { TableStatus } from "../models/table.model";

const validStatuses: TableStatus[] = [
  "AVAILABLE",
  "OCCUPIED",
  "RESERVED",
  "CLEANING",
  "INACTIVE",
];

/**
 * POST /api/v1/tables
 */
export async function createTableController(req: Request, res: Response) {
  try {
    const table = await createTable(req.body);

    return res.status(201).json({
      success: true,

      message: "Table created successfully",

      data: table,
    });
  } catch (error: any) {
    console.error("Create table error:", error);

    return res.status(400).json({
      success: false,

      message: error.message || "Failed to create table",
    });
  }
}

/**
 * GET /api/v1/tables
 */
export async function getTablesController(req: Request, res: Response) {
  try {
    const { status, area, isActive } = req.query;

    let tableStatus: TableStatus | undefined;

    if (status) {
      if (!validStatuses.includes(status as TableStatus)) {
        return res.status(400).json({
          success: false,

          message: "Invalid table status",
        });
      }

      tableStatus = status as TableStatus;
    }

    let active: boolean | undefined;

    if (isActive !== undefined) {
      active = String(isActive).toLowerCase() === "true";
    }

    const tables = await getTables({
      status: tableStatus,

      area: area ? String(area) : undefined,

      isActive: active,
    });

    return res.status(200).json({
      success: true,

      data: tables,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message || "Failed to get tables",
    });
  }
}

/**
 * GET /api/v1/tables/available
 */
export async function getAvailableTablesController(
  req: Request,
  res: Response,
) {
  try {
    const tables = await getAvailableTables();

    return res.status(200).json({
      success: true,

      data: tables,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message || "Failed to get available tables",
    });
  }
}

/**
 * GET /api/v1/tables/areas
 */
export async function getTableAreasController(req: Request, res: Response) {
  try {
    const areas = await getTableAreas();

    return res.status(200).json({
      success: true,

      data: areas,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message || "Failed to get table areas",
    });
  }
}

/**
 * GET /api/v1/tables/:id
 */
export async function getTableByIdController(req: Request, res: Response) {
  try {
    const table = await getTableById(req.params.id.toString());

    return res.status(200).json({
      success: true,

      data: table,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,

      message: error.message || "Table not found",
    });
  }
}

/**
 * PUT /api/v1/tables/:id
 */
export async function updateTableController(req: Request, res: Response) {
  try {
    const table = await updateTable(req.params.id.toString(), req.body);

    return res.status(200).json({
      success: true,

      message: "Table updated successfully",

      data: table,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message || "Failed to update table",
    });
  }
}

/**
 * DELETE /api/v1/tables/:id
 */
export async function deleteTableController(req: Request, res: Response) {
  try {
    await deleteTable(req.params.id.toString());

    return res.status(200).json({
      success: true,

      message: "Table deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message || "Failed to delete table",
    });
  }
}

/**
 * PATCH /api/v1/tables/:id/status
 */
export async function updateTableStatusController(req: Request, res: Response) {
  try {
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid table status",
      });
    }

    const table = await updateTableStatus(req.params.id.toString(), status);

    return res.status(200).json({
      success: true,

      message: "Table status updated successfully",

      data: table,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message || "Failed to update table status",
    });
  }
}
