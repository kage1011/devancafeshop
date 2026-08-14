import { Request, Response } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductStatus,
} from "../services/product.service";

import { ProductStatus } from "../models/product.model";

/**
 * POST /api/v1/products
 */
export async function createProductController(req: Request, res: Response) {
  try {
    const product = await createProduct(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    console.error("Create product error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
}

/**
 * GET /api/v1/products
 */
export async function getProductsController(req: Request, res: Response) {
  try {
    const { categoryId, status, page, limit } = req.query;

    const validStatuses = ["AVAILABLE", "OUT_OF_STOCK"];

    let productStatus: ProductStatus | undefined;

    if (status) {
      if (!validStatuses.includes(String(status))) {
        return res.status(400).json({
          success: false,
          message: "Invalid product status",
        });
      }

      productStatus = status as ProductStatus;
    }

    const result = await getProducts({
      categoryId: categoryId ? String(categoryId) : undefined,

      status: productStatus,

      page: page ? Number(page) : 1,

      limit: limit ? Number(limit) : 20,
    });

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to get products",
    });
  }
}

/**
 * GET /api/v1/products/:id
 */
export async function getProductByIdController(req: Request, res: Response) {
  try {
    const product = await getProductById(req.params.id.toString());

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Product not found",
    });
  }
}

/**
 * PUT /api/v1/products/:id
 */
export async function updateProductController(req: Request, res: Response) {
  try {
    const product = await updateProduct(req.params.id.toString(), req.body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
}

/**
 * DELETE /api/v1/products/:id
 */
export async function deleteProductController(req: Request, res: Response) {
  try {
    await deleteProduct(req.params.id.toString());

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
}

/**
 * PATCH /api/v1/products/:id/status
 */
export async function updateProductStatusController(
  req: Request,
  res: Response,
) {
  try {
    const { status } = req.body;

    if (status !== "AVAILABLE" && status !== "OUT_OF_STOCK") {
      return res.status(400).json({
        success: false,
        message: "Invalid product status",
      });
    }

    const product = await updateProductStatus(req.params.id.toString(), status);

    return res.status(200).json({
      success: true,
      message: "Product status updated successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update product status",
    });
  }
}
