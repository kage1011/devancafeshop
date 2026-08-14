import mongoose, { Document, Schema } from "mongoose";

export type TableStatus =
  | "AVAILABLE"
  | "OCCUPIED"
  | "RESERVED"
  | "CLEANING"
  | "INACTIVE";

export interface ITable extends Document {
  code: string;
  name: string;
  area?: string;
  capacity: number;
  status: TableStatus;
  note?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TableSchema = new Schema<ITable>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: 50,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    area: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      default: 2,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED", "RESERVED", "CLEANING", "INACTIVE"],
      default: "AVAILABLE",
      index: true,
    },

    note: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

TableSchema.index({
  area: 1,
  status: 1,
});

export const Table = mongoose.model<ITable>("Table", TableSchema);
