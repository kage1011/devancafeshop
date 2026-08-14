import mongoose from "mongoose";
import { Category, ICategory } from "../models/category.model";

export interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: string;
  status?: boolean;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  image?: string;
  status?: boolean;
}

/**
 * Tạo nhóm sản phẩm
 */
export async function createCategory(
  input: CreateCategoryInput,
): Promise<ICategory> {
  if (!input.name?.trim()) {
    throw new Error("Category name is required");
  }

  const existed = await Category.findOne({
    name: input.name.trim(),
  });

  if (existed) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name: input.name.trim(),
    description: input.description?.trim(),
    image: input.image?.trim(),
    status: input.status ?? true,
  });

  return category;
}

/**
 * Lấy danh sách category
 */
export async function getCategories() {
  return Category.find()
    .sort({
      name: 1,
    })
    .lean();
}

/**
 * Lấy category theo ID
 */
export async function getCategoryById(categoryId: string) {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error("Invalid categoryId");
  }

  const category = await Category.findById(categoryId).lean();

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
}

/**
 * Update category
 */
export async function updateCategory(
  categoryId: string,
  input: UpdateCategoryInput,
) {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error("Invalid categoryId");
  }

  if (input.name !== undefined) {
    if (!input.name.trim()) {
      throw new Error("Category name cannot be empty");
    }

    const existed = await Category.findOne({
      name: input.name.trim(),
      _id: {
        $ne: categoryId,
      },
    });

    if (existed) {
      throw new Error("Category already exists");
    }
  }

  const updateData: any = {
    ...input,
  };

  if (input.name !== undefined) {
    updateData.name = input.name.trim();
  }

  const category = await Category.findByIdAndUpdate(categoryId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
}

/**
 * Xóa category
 */
export async function deleteCategory(categoryId: string) {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error("Invalid categoryId");
  }

  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
}
