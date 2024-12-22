import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
