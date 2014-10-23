var _ = require('lodash');

var controller = {
    get_index: {
        handler: function (request, reply) {
            reply('template not defined')
        }
    },

    sendQ: function (reply, promise) {
        promise.then(function (data) {
            reply(data);
        })
        .fail(function (err) {
            console.log(err);
            reply(err);
        });
    },

    renderQ: function (reply, view, promise) {
        promise.then(function (data) {
            reply.view(view, data);
        })
        .fail(function (err) {
            console.log(err);
            reply(err);
        });
    }
};

function Controller(data) {
    _.extend(this, controller, data);
};


module.exports = Controller;
