// import Fastify from 'fastify'
const {
  day,
  month
} = require('./schemas')

const Fastify = require('fastify')
const fastify = Fastify()

const {
  log
} = console

const {
  fastSocket
} = require('./socket-conn')

const schema = {
  day,
  month
}

const {
  createMonth
} = require('../dist/models')

let $month, $day

// // create fate for a single day
fastify
  .post('/day/:id', schema.day, function (req, reply) {
    const id = req.params.id
    if (id < 0 || id > 30) {
      return reply.send({
        error: 'Invalid id'
      })
    }
    $day = $month.days[id]
    let pack = {
      day: $day.asJson
    }
    // fastSocket().send(pack)

    reply
      .send(pack);
  })

// create a new month of fate
fastify
  // async
  .post('/month', schema.month, function (_, reply) {
    log('received request for spinning new month')
    $month = createMonth()
    let pack = {
      month: $month.asJson
    }
    // send pack
    // log('socket', pack)
    // fastSocket().send(pack)

    log('REST:POST reply', pack)
    reply
      .send(pack)
  })


fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
