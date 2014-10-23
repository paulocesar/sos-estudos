var _ = require('lodash');

var Configure = function () {
    this.config = {}
}

var validate = function () {
    return { params: {}, payload: {} };
}

Configure.prototype = {
    session: function () {
        this.config.auth = 'session';
        return this;
    },

    params: function (v) {
        if (!this.config.validate) {
            this.config.validate = validate();
        }

        _.defaults(this.config.validate.params, v);
        return this;
    },

    payload: function (v) {
        if (!this.config.validate) {
            this.config.validate = validate();
        }

        _.defaults(this.config.validate.payload, v);
        return this;
    },

    done: function () {
        return this.config;
    }
}

module.exports = function () {
    return new Configure();
}
