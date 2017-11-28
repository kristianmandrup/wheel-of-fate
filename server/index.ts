import Fastify from 'fastify'
import {
  day,
  month
} from './schemas'
const fastify = Fastify()
let fastSocket

// Register websocket support
fastify.register(require('fastify-ws'), {
  library: 'uws' // Use the uws library instead of the default ws library
})

fastify.ready(() => {
  fastify['ws']
    .on('connection', socket => {
      fastSocket = socket
      // socket.on('message', msg => socket.send(msg)) // Creates an echo server
    })
})

fastify.listen(34567)

const schema = {
  day,
  month
}

import {
  createMonth
} from '../src/models'

let $month, $day

// create fate for a single day
fastify
  .post('/day/:id', schema.day, function (req, reply) {
    const id = req.params.id
    if (id < 0 || id > 30) {
      return reply.send({
        error: 'Invalid id'
      })
    }
    $day = $month.days[id]
    let pack = { day: $day.asJson }
    reply
      .send(pack);
    fastSocket.send(pack)
  })

// create a new month of fate
fastify
  .post('/month', schema.month, function (_, reply) {
    $month = createMonth()
    let pack = { month: $month.asJson }
    reply
      .send(pack)
    fastSocket.send(pack)
  })


fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
