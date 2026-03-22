import Fastify from "fastify";
import productsRoute from "./routes/products";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import "dotenv/config";

const port = Number(process.env.PORT) || 4000;

const fastify = Fastify();
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ message: `Route ${request.url} not found` });
});

fastify.register(productsRoute);

fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
