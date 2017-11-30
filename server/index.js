// import Fastify from 'fastify'
const {
  day,
  month
} = require('./schemas')

const Fastify = require('fastify')
const fastify = Fastify()

const {
  fastSocket
} = require('./socket-conn')

const schema = {
  day,
  month
}

const {
  createMonth
} = require('../src/models')

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
    reply
      .send(pack);
    fastSocket().send(pack)
  })

// create a new month of fate
fastify
  // async
  .post('/month', schema.month, function (_, reply) {
    $month = createMonth()
    let pack = {
      month: $month.asJson
    }
    reply
      .send(pack)
    fastSocket().send(pack)
  })


fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
