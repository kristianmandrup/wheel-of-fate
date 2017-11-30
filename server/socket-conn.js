var Fastify = require('fastify');
var fastify = Fastify();
var fastifyWS = require('fastify-ws');
// Register websocket support
fastify.register(fastifyWS);

const {
  createMonth,
  Engineer
} = require('../dist/models')

const {
  log
} = console

Engineer.createInitial(10)

let fastSocket
fastify.ready(() => {
  log('fastify ready: open socket conn')
  fastify.ws
    .on('connection', socket => {
      log('connected to socket :)')
      fastSocket = socket
      socket.on('message', (msg) => {
        let parsed = JSON.parse(msg)
        let type = parsed.request
        log('received msg', {
          parsed,
          type
        })
        if (type === 'month') {
          log('received month request')
          log('create and send new month to client')
          $month = createMonth()
          $month.fill()
          let pack = {
            type: 'month',
            month: $month.asJson
          }
          json = $month.asJson
          log('month sent', {
            $month,
            pack,
            json
          })
          const days = json.days
          const day1 = days[1]
          log('json', {
            days,
            day1
          })

          socket.send(JSON.stringify(pack))
        }
        if (type === 'day') {
          log('received day request', parsed.day)
          log('create and send new day to client')
          const pack = {
            type: 'day',
            // todo: generate real day
            day: {
              index: 1
            }
          }
          socket.send(JSON.stringify(pack))
        }
      })
    })
})

fastify.listen(34567)

module.exports = {
  fastSocket() {
    return fastSocket
  }
};
