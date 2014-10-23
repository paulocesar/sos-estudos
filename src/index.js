var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),

    API_PATH = path.resolve(__dirname, '.'),
    MODELS_PATH = path.resolve(API_PATH, 'models'),
    CONTROLLERS_PATH = path.resolve(API_PATH, 'controllers'),

    models = fs.readdirSync(MODELS_PATH),
    controllers = fs.readdirSync(CONTROLLERS_PATH),

    server = require('./core/server'),

    bootstrap = {models: {}, controllers: {}, server: server};

_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }
});

_.each(models, function (f) {
    if (!path.extname(f) == '.js')
        return;
    var name = path.basename(f, '.js');
    name = _(name).capitalize();

    bootstrap.models[name] = require(path.resolve(MODELS_PATH, f));
    bootstrap.models[name]._db = bootstrap.models;
});

_.each(controllers, function (c) {
    if (!path.extname(c) == '.js')
        return;
    var name = path.basename(c, '.js');
    name = name.toLowerCase();

    var controller = require(path.resolve(CONTROLLERS_PATH, c));
    controller.db = bootstrap.models;
    bootstrap.controllers[name] = controller;
});

bootstrap.server.buildApi(bootstrap);

exports = module.exports = bootstrap;
