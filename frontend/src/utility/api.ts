///////////////////////////////
// CENTRALIZES ALL API CALLS //
///////////////////////////////

import { Product } from "../types/Product";
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

// USER API CALLS --------------------------!
