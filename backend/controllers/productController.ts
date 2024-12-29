import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// @desc    Get Products
// @route   GET /api/products
// @access  private
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Get Product
// @route   GET /api/products/:id
// @access  private
const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

// @desc    Create Product
// @route   POST /api/products
// @access  private
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Extract uploaded image URLs
    const images = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: `Èrror: ${error}` });
  }
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  private
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Extract data from the request
  const { name, description, price, stock, category } = req.body;

  // Parse the updated `existingImages` array (if provided)
  const existingImages = req.body.existingImages
    ? JSON.parse(req.body.existingImages)
    : [];

  // Extract uploaded image URLs
  const newImages = req.files
    ? (req.files as Express.Multer.File[]).map(
        (file) => `/uploads/${file.filename}`
      )
    : [];

  // Combine existing and new images
  const updatedImages = [...existingImages, ...newImages];

  // Update the product fields
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.images = updatedImages; // Replace the entire images array

  const updatedProduct = await product.save();

  // Optionally delete files that were removed
  const removedImages = product.images.filter(
    (image) => !updatedImages.includes(image)
  );

  // Logic to delete files from the filesystem
  removedImages.forEach((image) => {
    const filePath = path.join(__dirname, "../uploads", path.basename(image));
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting file: ${filePath}`);
    });
  });

  res.status(200).json(updatedProduct);
});

// @desc    Delete Product
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

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
