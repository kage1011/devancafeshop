import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  categoryId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  image?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
