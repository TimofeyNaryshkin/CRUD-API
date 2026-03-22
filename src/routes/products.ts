import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProduct, getProducts } from "../db/db.service";
import {
  NotFoundSchema,
  ProductSchema,
  ResponseProductSchema,
} from "../schema/product";
import z from "zod";

const plugin: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "GET",
    url: "/api/products",
    schema: {
      response: {
        200: ProductSchema.array(),
      },
    },
    handler: (_req, res) => {
      res.send(getProducts());
    },
  });

  fastify.route({
    method: "GET",
    url: "/api/products/:productId",
    schema: {
      params: z.object({
        productId: z.uuid(),
      }),
      response: {
        200: ResponseProductSchema,
        404: NotFoundSchema,
      },
    },
    handler: (req, res) => {
      const product = getProduct(req.params.productId);
      if (!product) {
        res.code(404).send({ message: "Product not found" });
      } else {
        res.send(product);
      }
    },
  });
};

export default plugin;
