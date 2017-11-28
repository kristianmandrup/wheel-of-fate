"use strict";
exports.__esModule = true;
var fastify_1 = require("fastify");
var schemas_1 = require("./schemas");
var fastify = fastify_1["default"]();
fastify.register(require('fastify-ws'), {
    library: 'uws' // Use the uws library instead of the default ws library
});
fastify.ready(function () {
    fastify['ws']
        .on('connection', function (socket) {
        socket.on('message', function (msg) { return socket.send(msg); }); // Creates an echo server
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
    reply
        .send({ day: $day.asJson });
});
// create a new month of fate
fastify
    .post('/month', schema.month, function (_, reply) {
    $month = models_1.createMonth();
    reply
        .send({ month: $month.asJson });
});
fastify.listen(3000, function (err) {
    if (err)
        throw err;
    console.log("server listening on " + fastify.server.address().port);
});
