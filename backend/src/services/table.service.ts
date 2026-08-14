import mongoose from "mongoose";

import {
  Table,
  ITable,
  TableStatus
} from "../models/table.model";

export interface CreateTableInput {
  code: string;
  name: string;
  area?: string;
  capacity: number;
  note?: string;
  status?: TableStatus;
  isActive?: boolean;
}

export interface UpdateTableInput {
  code?: string;
  name?: string;
  area?: string;
  capacity?: number;
  note?: string;
  isActive?: boolean;
}


/**
 * Tạo bàn
 */
export async function createTable(
  input: CreateTableInput
): Promise<ITable> {

  if (!input.code?.trim()) {
    throw new Error("Table code is required");
  }

  if (!input.name?.trim()) {
    throw new Error("Table name is required");
  }

  if (
    input.capacity === undefined ||
    input.capacity < 1
  ) {
    throw new Error(
      "Table capacity must be greater than 0"
    );
  }

  const code =
    input.code.trim().toUpperCase();

  /**
   * Kiểm tra code đã tồn tại
   */
  const existed =
    await Table.findOne({
      code
    });

  if (existed) {
    throw new Error(
      "Table code already exists"
    );
  }

  const table =
    await Table.create({
      code,

      name:
        input.name.trim(),

      area:
        input.area?.trim(),

      capacity:
        input.capacity,

      note:
        input.note?.trim(),

      status:
        input.status ??
        "AVAILABLE",

      isActive:
        input.isActive ??
        true
    });

  return table;
}


/**
 * Lấy danh sách bàn
 */
export async function getTables(
  options?: {
    status?: TableStatus;

    area?: string;

    isActive?: boolean;
  }
) {

  const filter: Record<
    string,
    any
  > = {};

  if (options?.status) {
    filter.status =
      options.status;
  }

  if (options?.area) {
    filter.area =
      options.area;
  }

  if (
    options?.isActive !== undefined
  ) {
    filter.isActive =
      options.isActive;
  }

  return Table.find(filter)
    .sort({
      area: 1,
      code: 1
    })
    .lean();
}


/**
 * Lấy bàn theo ID
 */
export async function getTableById(
  tableId: string
) {

  if (
    !mongoose.Types.ObjectId.isValid(
      tableId
    )
  ) {
    throw new Error(
      "Invalid tableId"
    );
  }

  const table =
    await Table
      .findById(tableId)
      .lean();

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  return table;
}


/**
 * Cập nhật thông tin bàn
 */
export async function updateTable(
  tableId: string,
  input: UpdateTableInput
) {

  if (
    !mongoose.Types.ObjectId.isValid(
      tableId
    )
  ) {
    throw new Error(
      "Invalid tableId"
    );
  }

  if (
    input.capacity !== undefined &&
    input.capacity < 1
  ) {
    throw new Error(
      "Table capacity must be greater than 0"
    );
  }

  /**
   * Nếu đổi code
   */
  if (input.code !== undefined) {

    const code =
      input.code
        .trim()
        .toUpperCase();

    if (!code) {
      throw new Error(
        "Table code cannot be empty"
      );
    }

    const existed =
      await Table.findOne({
        code,

        _id: {
          $ne: tableId
        }
      });

    if (existed) {
      throw new Error(
        "Table code already exists"
      );
    }

    input.code = code;
  }

  const table =
    await Table.findByIdAndUpdate(
      tableId,
      {
        ...input,

        ...(input.name !== undefined && {
          name: input.name.trim()
        }),

        ...(input.area !== undefined && {
          area: input.area.trim()
        }),

        ...(input.note !== undefined && {
          note: input.note.trim()
        })
      },
      {
        new: true,
        runValidators: true
      }
    );

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  return table;
}


/**
 * Xóa bàn
 */
export async function deleteTable(
  tableId: string
) {

  if (
    !mongoose.Types.ObjectId.isValid(
      tableId
    )
  ) {
    throw new Error(
      "Invalid tableId"
    );
  }

  const table =
    await Table.findById(
      tableId
    );

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  /**
   * Không cho xóa bàn đang có khách
   */
  if (
    table.status === "OCCUPIED"
  ) {
    throw new Error(
      "Cannot delete an occupied table"
    );
  }

  await Table.findByIdAndDelete(
    tableId
  );

  return true;
}


/**
 * Đổi trạng thái bàn
 */
export async function updateTableStatus(
  tableId: string,
  status: TableStatus
) {

  if (
    !mongoose.Types.ObjectId.isValid(
      tableId
    )
  ) {
    throw new Error(
      "Invalid tableId"
    );
  }

  const validStatuses: TableStatus[] = [
    "AVAILABLE",
    "OCCUPIED",
    "RESERVED",
    "CLEANING",
    "INACTIVE"
  ];

  if (
    !validStatuses.includes(status)
  ) {
    throw new Error(
      "Invalid table status"
    );
  }

  const table =
    await Table.findByIdAndUpdate(
      tableId,
      {
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

  if (!table) {
    throw new Error(
      "Table not found"
    );
  }

  return table;
}


/**
 * Lấy bàn trống
 */
export async function getAvailableTables() {

  return Table.find({
    status: "AVAILABLE",
    isActive: true
  })
    .sort({
      area: 1,
      code: 1
    })
    .lean();
}


/**
 * Lấy danh sách khu vực
 */
export async function getTableAreas() {

  return Table.distinct(
    "area",
    {
      isActive: true
    }
  );
}