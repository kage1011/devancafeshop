import mongoose from "mongoose";
import { Order, IOrder, OrderStatus } from "../models/order.model";
import {
  emitOrderCreated,
  emitOrderUpdated,
  emitOrderStatusChanged,
} from "./socket.service";

export interface CreateOrderItemInput {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  note?: string;
}

export interface CreateOrderInput {
  tableId?: string;
  tableName?: string;
  items: CreateOrderItemInput[];
  discount?: number;
  note?: string;
  createdBy: string;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

/**
 * Generate order number
 *
 * Example:
 * ORD202608140001
 */
async function generateOrderNumber(): Promise<string> {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const prefix = `ORD${year}${month}${day}`;
  const lastOrder = await Order.findOne({
    orderNumber: {
      $regex: `^${prefix}`,
    },
  })
    .sort({
      orderNumber: -1,
    })
    .lean();
  let sequence = 1;
  if (lastOrder) {
    const lastSequence = Number(lastOrder.orderNumber.slice(-4));
    sequence = lastSequence + 1;
  }
  return prefix + String(sequence).padStart(4, "0");
}

/**
 * Create new order
 */
export async function createOrder(input: CreateOrderInput): Promise<IOrder> {
  if (!input.items || input.items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  if (!mongoose.Types.ObjectId.isValid(input.createdBy)) {
    throw new Error("Invalid createdBy");
  }

  if (input.tableId && !mongoose.Types.ObjectId.isValid(input.tableId)) {
    throw new Error("Invalid tableId");
  }

  for (const item of input.items) {
    if (!mongoose.Types.ObjectId.isValid(item.productId)) {
      throw new Error(`Invalid productId: ${item.productId}`);
    }

    if (item.quantity <= 0) {
      throw new Error("Product quantity must be greater than 0");
    }

    if (item.price < 0) {
      throw new Error("Product price cannot be negative");
    }
  }

  const orderItems = input.items.map((item) => {
    const subtotal = item.quantity * item.price;

    return {
      productId: new mongoose.Types.ObjectId(item.productId),
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      note: item.note,
      subtotal,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const discount = input.discount ?? 0;

  if (discount < 0) {
    throw new Error("Discount cannot be negative");
  }

  if (discount > subtotal) {
    throw new Error("Discount cannot be greater than subtotal");
  }

  const total = subtotal - discount;

  const orderNumber = await generateOrderNumber();

  const order = await Order.create({
    orderNumber,
    tableId: input.tableId
      ? new mongoose.Types.ObjectId(input.tableId)
      : undefined,
    tableName: input.tableName,
    items: orderItems,
    subtotal,
    discount,
    total,
    status: "PENDING",
    note: input.note,
    createdBy: new mongoose.Types.ObjectId(input.createdBy),
  });

  /**
   * Send realtime notification
   */
  emitOrderCreated({
    orderId: order._id.toString(),
    orderNumber: order.orderNumber,
    tableId: order.tableId?.toString(),
    tableName: order.tableName,
    total: order.total,
    createdBy: order.createdBy.toString(),
    status: order.status,
  });

  return order;
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<IOrder> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid orderId");
  }

  const order = await Order.findById(orderId)
    .populate("createdBy", "username fullName")
    .lean();

  if (!order) {
    throw new Error("Order not found");
  }

  return order as IOrder;
}

/**
 * Get all orders
 */
export async function getOrders(options?: {
  status?: OrderStatus;
  tableId?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(options?.page ?? 1, 1);
  const limit = Math.min(Math.max(options?.limit ?? 20, 1), 100);
  const skip = (page - 1) * limit;
  const filter: Record<string, any> = {};
  if (options?.status) {
    filter.status = options.status;
  }
  if (options?.tableId) {
    if (!mongoose.Types.ObjectId.isValid(options.tableId)) {
      throw new Error("Invalid tableId");
    }
    filter.tableId = new mongoose.Types.ObjectId(options.tableId);
  }

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "username fullName")
      .lean(),

    Order.countDocuments(filter),
  ]);

  return {
    data: orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<IOrder> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid orderId");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const oldStatus = order.status;

  if (oldStatus === "COMPLETED" || oldStatus === "CANCELLED") {
    throw new Error(`Cannot change status from ${oldStatus}`);
  }

  order.status = status;

  await order.save();

  /**
   * Notify clients
   */
  emitOrderStatusChanged({
    orderId: order._id.toString(),
    orderNumber: order.orderNumber,
    oldStatus,
    newStatus: status,
    tableId: order.tableId?.toString(),
  });

  return order;
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string): Promise<IOrder> {
  return updateOrderStatus(orderId, "CANCELLED");
}

/**
 * Confirm order
 */
export async function confirmOrder(orderId: string): Promise<IOrder> {
  return updateOrderStatus(orderId, "CONFIRMED");
}

/**
 * Start preparing order
 */
export async function startPreparingOrder(orderId: string): Promise<IOrder> {
  return updateOrderStatus(orderId, "PREPARING");
}

/**
 * Mark order as ready
 */
export async function readyOrder(orderId: string): Promise<IOrder> {
  return updateOrderStatus(orderId, "READY");
}

/**
 * Complete order
 */
export async function completeOrder(orderId: string): Promise<IOrder> {
  return updateOrderStatus(orderId, "COMPLETED");
}
