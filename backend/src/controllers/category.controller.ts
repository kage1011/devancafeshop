import { Request, Response } from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

/**
 * POST /api/v1/categories
 */
export async function createCategoryController(req: Request, res: Response) {
  try {
    const category = await createCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error: any) {
    console.error("Create category error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create category",
    });
  }
}

/**
 * GET /api/v1/categories
 */
export async function getCategoriesController(req: Request, res: Response) {
  try {
    const categories = await getCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to get categories",
    });
  }
}

/**
 * GET /api/v1/categories/:id
 */
export async function getCategoryByIdController(req: Request, res: Response) {
  try {
    const category = await getCategoryById(req.params.id.toString());

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Category not found",
    });
  }
}

/**
 * PUT /api/v1/categories/:id
 */
export async function updateCategoryController(req: Request, res: Response) {
  try {
    const category = await updateCategory(req.params.id.toString(), req.body);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update category",
    });
  }
}

/**
 * DELETE /api/v1/categories/:id
 */
export async function deleteCategoryController(req: Request, res: Response) {
  try {
    await deleteCategory(req.params.id.toString());

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete category",
    });
  }
}
