import Fastify from "fastify";

const fastify = Fastify({
  logger: false,
});

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 3000 }, function (err, address) {
  console.log("✅ Server is running on:", address);
});
