var hapiAuthCookie = require('hapi-auth-cookie')
  , _ = require('lodash')
  , config = require('../../config')
  , User = null

  , mainPrivatePage = config.loggedInIndex || config.index
  , mainPublicPage = config.index

  , passportLoginView = 'passport/login';

var login = {
    method: ['GET', 'POST'],
    path: '/login',
    config: {
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },
    handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            reply().redirect(mainPrivatePage);
        }

        if (request.method === 'get') {
            return reply.view(passportLoginView, {message: ''});
        }

        if (!request.payload.username || !request.payload.password) {
            return reply.view(passportLoginView, {message: 'Missing username or password'});
        }

        User.findOne({username: request.payload.username}).execQ()
            .then(function (user) {
                if (!user || user.password !== request.payload.password) {
                    return reply.view(passportLoginView, {message: 'Invalid username or password'});
                }
                request.auth.session.set(_.pick(user, '_id', 'username', 'name', 'role'));
                reply().redirect(mainPrivatePage);
            })
            .fail(reply);
    }
};

var logout = {
    method: 'GET',
    path: '/logout',
    config: {
        auth: 'session'
    },
    handler: function (request, reply) {
        request.auth.session.clear();
        return reply.redirect(mainPublicPage);
    }
}

module.exports = function (server, api, next) {
    User = api.models.User;

    server.pack.register(hapiAuthCookie, function (err) {

        server.auth.strategy('session', 'cookie', {
            password: 'secret',
            cookie: 'sid-example',
            redirectTo: '/login',
            isSecure: false
        });

        server.route([login, logout]);

        next();
    });
}
