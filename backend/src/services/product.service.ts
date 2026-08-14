import mongoose from "mongoose";
import { Product, IProduct, ProductStatus } from "../models/product.model";
import { Category } from "../models/category.model";
export interface CreateProductInput {
  name: string;
  image?: string;
  price: number;
  description?: string;
  categoryId: string;
  status?: ProductStatus;
  isHot?: boolean;
}

export interface UpdateProductInput {
  name?: string;
  image?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  status?: ProductStatus;
  isHot?: boolean;
}

/**
 * Create product
 */
export async function createProduct(
  input: CreateProductInput,
): Promise<IProduct> {
  if (!input.name?.trim()) {
    throw new Error("Product name is required");
  }

  if (input.price < 0) {
    throw new Error("Product price cannot be negative");
  }

  if (!mongoose.Types.ObjectId.isValid(input.categoryId)) {
    throw new Error("Invalid categoryId");
  }
  const category = await Category.findById(input.categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  if (!category.status) {
    throw new Error("Category is inactive");
  }
  const product = await Product.create({
    name: input.name.trim(),
    image: input.image?.trim(),
    price: input.price,
    description: input.description?.trim(),
    categoryId: new mongoose.Types.ObjectId(input.categoryId),
    status: input.status ?? "AVAILABLE",
    isHot: input.isHot ?? false,
  });

  return product;
}

/**
 * Get products
 */
export async function getProducts(options?: {
  categoryId?: string;
  status?: ProductStatus;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(options?.page ?? 1, 1);
  const limit = Math.min(Math.max(options?.limit ?? 20, 1), 100);
  const skip = (page - 1) * limit;
  const filter: Record<string, any> = {};
  if (options?.categoryId) {
    if (!mongoose.Types.ObjectId.isValid(options.categoryId)) {
      throw new Error("Invalid categoryId");
    }

    filter.categoryId = new mongoose.Types.ObjectId(options.categoryId);
  }
  if (options?.status) {
    filter.status = options.status;
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("categoryId", "name")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Product.countDocuments(filter),
  ]);

  return {
    data: products,

    pagination: {
      page,
      limit,
      total,

      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get product by ID
 */
export async function getProductById(productId: string) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid productId");
  }
  const product = await Product.findById(productId)
    .populate("categoryId", "name")
    .lean();
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

/**
 * Update product
 */
export async function updateProduct(
  productId: string,
  input: UpdateProductInput,
) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid productId");
  }
  if (input.price !== undefined && input.price < 0) {
    throw new Error("Product price cannot be negative");
  }
  if (input.categoryId) {
    if (!mongoose.Types.ObjectId.isValid(input.categoryId)) {
      throw new Error("Invalid categoryId");
    }
  }

  const updateData: any = {
    ...input,
  };

  if (input.categoryId) {
    updateData.categoryId = new mongoose.Types.ObjectId(input.categoryId);
  }

  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

/**
 * Delete product
 */
export async function deleteProduct(productId: string) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid productId");
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

/**
 * Update product status
 */
export async function updateProductStatus(
  productId: string,
  status: ProductStatus,
) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid productId");
  }

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
