var _ = require('lodash'),
    mongoose = require('mongoose-q')(require('mongoose')),
    util = require('util'),
    modelBase = {};

mongoose.connect('mongodb://localhost/test');
GLOBAL.mongoose = mongoose;
GLOBAL.ObjectId = mongoose.Schema.Types.ObjectId;

var Model = function (model) {
    var s = new mongoose.Schema(model.schema);

    _.defaults(s.methods, model.methods, modelBase.methods);
    _.defaults(s.statics, model.statics, modelBase.statics);

    var m = mongoose.model(model.name, s);

    return m
};

module.exports = Model

_.extend(modelBase, {
    methods: {

    },

    statics: {
        findNewVersions: function (items) {
            var v = formatVersions(items);
            return this.find({$or: v});
        },

        findOneNewVersion: function (items) {
            var v = formatVersions(items);
            return this.findOne(v[0]);
        }
    }
});

var formatVersions = function (items) {
    var items = [].concat(items),
        versions = [];

    _.each(items, function (i) {
        versions.push({_id: i._id, __v: {$gt: i.__v}});
    })

    return versions;
}
