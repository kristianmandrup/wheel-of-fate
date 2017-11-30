var Fastify = require('fastify');
var fastify = Fastify();
var fastifyWS = require('fastify-ws');
// Register websocket support
fastify.register(fastifyWS);

const {
  log
} = console

let fastSocket
fastify.ready(() => {
  log('fastify ready: open socket conn')
  fastify.ws
    .on('connection', socket => {
      log('connection', {
        socket
      })
      fastSocket = socket
      socket.on('message', (msg) => {
        log('received msg to echo', msg)
        socket.send(msg)
      }) // Creates an echo server
    })
})

fastify.listen(34567)

module.exports = {
  fastSocket() {
    return fastSocket
  }
};
