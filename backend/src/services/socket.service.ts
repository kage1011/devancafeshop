import { getSocket } from "../config/socket";

export interface OrderCreatedEvent {
  orderId: string;
  orderNumber: string;
  tableId?: string;
  tableName?: string;
  total: number;
  createdBy: string;
  status: string;
}

export interface OrderStatusChangedEvent {
  orderId: string;
  orderNumber: string;
  oldStatus: string;
  newStatus: string;
  tableId?: string;
}

/**
 * New order
 */
export function emitOrderCreated(data: OrderCreatedEvent) {
  const io = getSocket();
  io.to("bar").emit("order:created", data);
  io.to("cashier").emit("order:created", data);
  io.to("admin").emit("order:created", data);
  console.log(`[Socket] order:created ${data.orderNumber}`);
}

/**
 * Order status changed
 */
export function emitOrderStatusChanged(data: OrderStatusChangedEvent) {
  const io = getSocket();
  io.to("bar").emit("order:status_changed", data);
  io.to("cashier").emit("order:status_changed", data);
  io.to("admin").emit("order:status_changed", data);
  console.log(
    `[Socket] order:status_changed ${data.orderNumber}: ${data.oldStatus} -> ${data.newStatus}`,
  );
}

/**
 * Generic order updated
 */
export function emitOrderUpdated(data: any) {
  const io = getSocket();
  io.to("bar").emit("order:updated", data);
  io.to("cashier").emit("order:updated", data);
  io.to("admin").emit("order:updated", data);
}
