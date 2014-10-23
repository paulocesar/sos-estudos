var path = require('path'),
    _ = require('lodash'),
    Hapi = require('hapi'),
    passport = require('./passport'),
    config = require('../../config'),

    PORT = config.port,

    PUBLIC_PATH = path.resolve(__dirname, '../public'),
    VIEWS_PATH = path.resolve(__dirname, '../views'),

    defaultPage = config.index,

    methods = ['GET', 'POST'],

    server = new Hapi.Server(PORT, {
        files: {
            relativeTo: PUBLIC_PATH
        },

        views: {
            engines: {
                html: require('ejs')
            },
            path: VIEWS_PATH,
            isCached: false
        }
    });

module.exports = {
    buildApi: function (api) {
        passport(server, api, function () {
            _.each(api.controllers, function (controller, itemName) {
                var cName = controller.name || itemName;

                _.each(controller, function (func, name) {
                    var f = name.split('_'),
                        fMethod = f[0].toUpperCase(),
                        fName = f[1];

                    if (methods.indexOf(fMethod) >= 0) {
                        var handler = func.handler || func,
                            route = {
                                method: fMethod,
                                path: '/' + cName + '/' + fName,
                                config: {},
                                handler: _.bind(handler, controller)
                            };

                        if (func.config) {
                            route.config = func.config;
                        }

                        console.log(
                            (route.method + ' ').slice(0,4),
                            route.path,
                            _.omit(route.config, 'validate')
                        );

                        server.route(route);
                    }
                });

            });

            server.route({
                method: 'GET',
                path: '/{param*}',
                handler: {
                    directory: {
                        path: PUBLIC_PATH
                    }
                }
            });

            server.route({
                method: 'GET',
                path: '/',
                handler: function (request, reply) {
                    reply().redirect(defaultPage);
                }
            });
        });
    },

    start: function () {
        console.log('starting...');
        server.start(function () {
            console.log('Server running at:', server.info.uri);
        });
    }
}
