import { v4 as uuidv4 } from 'uuid';
import { Product } from "../models/product";
import { db } from "./db";

export function getProducts() {
  return db;
}

export function getProduct(id: string) {
  return db.find((p) => p.id === id);
}

export function createProduct(product: Product) {
  const dbProduct = {...product, id: uuidv4()}
  db.push(dbProduct);
  return dbProduct;
}

export function updateProduct(id: string, product: Product) {
  let index = db.findIndex((p) => p.id === id);
  db[index] = { ...db[index], ...product };
  return db[index];
}

export function deleteProduct(id: string) {
  const index = db.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.splice(index, 1);
  return true
}
