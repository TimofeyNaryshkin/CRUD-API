import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../db/db.service";
import {
  NotFoundSchema,
  ProductIdSchema,
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
      params: ProductIdSchema,
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

  fastify.route({
    method: "POST",
    url: "/api/products",
    schema: {
      body: ProductSchema,
      response: {
        201: ResponseProductSchema,
      },
    },
    handler: (req, res) => {
      res.send(createProduct(req.body));
    },
  });

  fastify.route({
    method: "PUT",
    url: "/api/products/:productId",
    schema: {
      params: ProductIdSchema,
      body: ProductSchema.partial(),
      response: {
        200: ResponseProductSchema,
        404: NotFoundSchema,
      },
    },
    handler: (req, res) => {
      const product = updateProduct(req.params.productId, req.body);
      if (!product) {
        res.code(404).send({ message: "Product not found" });
      } else {
        res.send(product);
      }
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/api/products/:productId",
    schema: {
      params: ProductIdSchema,
      response: {
        204: z.null(),
        404: NotFoundSchema,
      },
    },
    handler: (req, res) => {
      const isDeleted = deleteProduct(req.params.productId);
      if (!isDeleted) {
        res.code(404).send({ message: "Product not found" });
      } else {
        res.code(204).send(null);
      }
    },
  });
};

export default plugin;
