import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
  STAFF = "STAFF",
  KITCHEN = "KITCHEN"
}

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STAFF
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<IUser>("User", userSchema);