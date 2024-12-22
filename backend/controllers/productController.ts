import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// desc@    Get Products
// @route   GET /api/products
// @access  private
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// desc@    Create Product
// @route   POST /api/products
// @access  private
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: `Èrror: ${error}` });
  }
});

// desc@    Update Product
// @route   PUT /api/products/:id
// @access  private
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

// desc@    Delete Product
// @route   DELETE /api/products/:id
// @access  private
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await product.deleteOne(); // Remove the product from the database

  res
    .status(200)
    .json({ message: `Product ${req.params.id} deleted successfully` });
});

export { getProducts, createProduct, updateProduct, deleteProduct };
