"use strict";
exports.__esModule = true;
// import Fastify from 'fastify'
var Fastify = require('fastify');
var schemas_1 = require("./schemas");
var fastify = Fastify();
var fastSocket;
// Register websocket support
fastify.register(require('fastify-ws'), {
    library: 'uws' // Use the uws library instead of the default ws library
});
fastify.ready(function () {
    fastify['ws']
        .on('connection', function (socket) {
        fastSocket = socket;
        // socket.on('message', msg => socket.send(msg)) // Creates an echo server
    });
});
fastify.listen(34567);
var schema = {
    day: schemas_1.day,
    month: schemas_1.month
};
var models_1 = require("../src/models");
var $month, $day;
// create fate for a single day
fastify
    .post('/day/:id', schema.day, function (req, reply) {
    var id = req.params.id;
    if (id < 0 || id > 30) {
        return reply.send({
            error: 'Invalid id'
        });
    }
    $day = $month.days[id];
    var pack = { day: $day.asJson };
    reply
        .send(pack);
    fastSocket.send(pack);
});
// create a new month of fate
fastify
    .post('/month', schema.month, function (_, reply) {
    $month = models_1.createMonth();
    var pack = { month: $month.asJson };
    reply
        .send(pack);
    fastSocket.send(pack);
});
fastify.listen(3000, function (err) {
    if (err)
        throw err;
    console.log("server listening on " + fastify.server.address().port);
});
