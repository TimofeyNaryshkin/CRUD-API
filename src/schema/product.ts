import z from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  inStock: z.boolean(),
});

export const ResponseProductSchema = ProductSchema.extend({
  id: z.uuid()
})
