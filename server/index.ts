const fastify = require('fastify')()

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

import {
  createMonth
} from '../models'

fastify
  .get('/', schema, function (_, reply) {
    reply
      .send({ hello: 'world' })
  })

fastify
  .post('/month', schema, function (_, reply) {
    const month = createMonth()
    reply
      .send({ month: month.asJson })
  })


fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
