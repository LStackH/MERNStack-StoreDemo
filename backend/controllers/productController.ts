import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// desc@    Get Products
// @route   GET /api/products
// @access  private
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Get Products" });
});

// desc@    Create Product
// @route   POST /api/products
// @access  private
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name to the product");
  }
  res.status(200).json({ message: "Create a Product" });
});

// desc@    Update Product
// @route   PUT /api/products/:id
// @access  private
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Update Product ${req.params.id}` });
});

// desc@    Delete Product
// @route   DELETE /api/products/:id
// @access  private
const deleteProduct = asyncHandler(async(req: Request, res: Response) => {
  res.status(200).json({ message: `Delete Product ${req.params.id}` });
};

export { getProducts, createProduct, updateProduct, deleteProduct };
