import z from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  inStock: z.boolean(),
});

export const ResponseProductSchema = ProductSchema.extend({
  id: z.uuid(),
});

export const NotFoundSchema = z.object({
  message: z.string(),
});

export const ProductIdSchema = z.object({
  productId: z.uuid(),
});
