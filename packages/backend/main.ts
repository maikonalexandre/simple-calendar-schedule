import Fastify from 'fastify'

const fastify = Fastify({
  logger: false,
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

function start(err, address) {
  console.log('✅ Server is running on:', address, err)
}

fastify.listen({ port: 3000 }, start)
