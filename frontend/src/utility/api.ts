///////////////////////////////
// CENTRALIZES ALL API CALLS //
///////////////////////////////

import { Product } from "../types/Product";
import { User } from "../types/User";
// Base URL to access the API section of the backend (probably /api)
const BASE_URL = "/api";

// PRODUCT API CALLS --------------------------

// GET all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

// GET single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch product: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

// Protected POST to create product
export const createProduct = async (
  formData: FormData,
  token: string
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to create product.");
  }

  return response.json();
};

// Protected UPDATE to update a product by ID
export const updateProduct = async (
  productId: string,
  formData: FormData,
  token: string
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to update product.");
  }

  return response.json();
};

// Protected DELETE to delete a product by ID
export const deleteProduct = async (
  productId: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token for authentication
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to delete product.");
  }
};

// PRODUCT API CALLS --------------------------!

// USER API CALLS --------------------------

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

// POST to login
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Login failed.");
  }

  return await response.json();
};

// POST to register
export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Registration failed.");
  }

  return await response.json();
};

// Protected GET to fetch user data
export const fetchUser = async (token: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the Authorization header
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to fetch user.");
  }

  return response.json();
};

// USER API CALLS --------------------------!
