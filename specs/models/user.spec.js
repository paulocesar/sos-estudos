var _ = require('lodash'),
    assert = require('assert'),
    m = require('../../src').models,
    User = m.User;

describe('User', function () {
    it('creates user', function (done) {
        var u = new User({
            username: 'Admin',
            name: 'Admin da Silva',
            password: '123',
            role: User.role('admin'),
            messages: []
        });

        u.saveQ()
            .then(function ()  { return done(); })
            .fail(done);
    });

    it('remove user', function (done) {
        User.find({username: 'Admin'})
            .remove()
            .execQ()
            .then(function() { done(); })
            .fail(done);
    });
});
