import Fastify from "fastify";
import productsRoute from './routes/products'

const fastify = Fastify({
  logger: true,
});

fastify.register(productsRoute);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
