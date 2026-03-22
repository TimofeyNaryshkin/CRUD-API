import Fastify from "fastify";
import productsRoute from './routes/products'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const fastify = Fastify();
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(productsRoute);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
