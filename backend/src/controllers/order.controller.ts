import { Request, Response } from "express";

import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  confirmOrder,
  startPreparingOrder,
  readyOrder,
  completeOrder,
  cancelOrder,
} from "../services/order.service";

import { OrderStatus } from "../models/order.model";

/**
 * CREATE ORDER
 *
 * POST /api/v1/orders
 */
export async function createOrderController(req: Request, res: Response) {
  try {
    const { tableId, tableName, items, discount, note } = req.body;

    /**
     * Tạm thời lấy userId từ body.
     *
     * Sau khi hoàn thiện JWT middleware,
     * sẽ lấy từ req.user.id.
     */
    const createdBy = req.body.createdBy;

    if (!createdBy) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    const order = await createOrder({
      tableId,
      tableName,
      items,
      discount,
      note,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Create order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to create order",
    });
  }
}

/**
 * GET ORDER BY ID
 *
 * GET /api/v1/orders/:id
 */
export async function getOrderByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const order = await getOrderById(id.toString());

    return res.status(200).json({
      success: true, 
      data: order,
    });
  } catch (error: any) {
    console.error("Get order error:", error);

    return res.status(404).json({
      success: false,
      message: error?.message || "Order not found",
    });
  }
}

/**
 * GET ORDERS
 *
 * GET /api/v1/orders
 *
 * Query:
 *
 * ?status=PENDING
 * ?tableId=xxx
 * ?page=1
 * ?limit=20
 */
export async function getOrdersController(req: Request, res: Response) {
  try {
    const { status, tableId, page, limit } = req.query;

    let orderStatus: OrderStatus | undefined;

    if (status) {
      const validStatuses: OrderStatus[] = [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "COMPLETED",
        "CANCELLED",
      ];

      if (!validStatuses.includes(status as OrderStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      orderStatus = status as OrderStatus;
    }

    const result = await getOrders({
      status: orderStatus,

      tableId: tableId ? String(tableId) : undefined,

      page: page ? Number(page) : 1,

      limit: limit ? Number(limit) : 20,
    });

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    console.error("Get orders error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to get orders",
    });
  }
}

/**
 * UPDATE ORDER STATUS
 *
 * PATCH /api/v1/orders/:id/status
 *
 * Body:
 *
 * {
 *   "status": "PREPARING"
 * }
 */
export async function updateOrderStatusController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatuses: OrderStatus[] = [
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "READY",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status as OrderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await updateOrderStatus(id.toString(), status as OrderStatus);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Update order status error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to update order status",
    });
  }
}

/**
 * CONFIRM ORDER
 *
 * POST /api/v1/orders/:id/confirm
 */
export async function confirmOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const order = await confirmOrder(id.toString());

    return res.status(200).json({
      success: true,
      message: "Order confirmed successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Confirm order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to confirm order",
    });
  }
}

/**
 * START PREPARING
 *
 * POST /api/v1/orders/:id/preparing
 */
export async function startPreparingOrderController(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;

    const order = await startPreparingOrder(id.toString());

    return res.status(200).json({
      success: true,
      message: "Order is being prepared",
      data: order,
    });
  } catch (error: any) {
    console.error("Start preparing order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to start preparing order",
    });
  }
}

/**
 * READY ORDER
 *
 * POST /api/v1/orders/:id/ready
 */
export async function readyOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const order = await readyOrder(id.toString());

    return res.status(200).json({
      success: true,
      message: "Order is ready",
      data: order,
    });
  } catch (error: any) {
    console.error("Ready order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to update order",
    });
  }
}

/**
 * COMPLETE ORDER
 *
 * POST /api/v1/orders/:id/complete
 */
export async function completeOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const order = await completeOrder(id.toString());

    return res.status(200).json({
      success: true,
      message: "Order completed successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Complete order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to complete order",
    });
  }
}

/**
 * CANCEL ORDER
 *
 * POST /api/v1/orders/:id/cancel
 */
export async function cancelOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const order = await cancelOrder(id.toString());

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Cancel order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to cancel order",
    });
  }
}
