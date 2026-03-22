import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProducts } from "../db/db.service";
import { ProductSchema } from "../schema/product";

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
};

export default plugin;
