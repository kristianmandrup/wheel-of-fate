var Fastify = require('fastify');
var fastify = Fastify();
var fastifyWS = require('fastify-ws');
// Register websocket support
fastify.register(fastifyWS);

let fastSocket
fastify.ready(() => {
  console.log('fastify ready: open socket conn')
  fastify.ws
    .on('connection', socket => {
      console.log('connection', {
        socket
      })
      fastSocket = socket
      socket.on('message', msg => socket.send(msg)) // Creates an echo server
    })
})

fastify.listen(34567)

module.exports = {
  fastSocket() {
    return fastSocket
  }
};
