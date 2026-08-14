import mongoose, { Document, Schema } from "mongoose";

export type ProductStatus = "AVAILABLE" | "OUT_OF_STOCK";

export interface IProduct extends Document {
  name: string;
  image?: string;
  price: number;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
  isHot?: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    image: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "OUT_OF_STOCK"],
      default: "AVAILABLE",
      index: true,
    },

    isHot: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
