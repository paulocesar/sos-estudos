var _ = require('lodash'),
    assert = require('assert'),
    m = require('../../src').models,
    User = m.User,
    Classroom = m.Classroom;

describe('Classroom', function () {
    it('create Classroom', function (done) {
        Classroom.createQ('Sample 1', '1234')
            .then(function (c) {
                return c.createLessonQ('new Lesson');
            })
            .then(function (c) {
                console.log(c);
                return done();
            })
            .fail(done);
    });

    it('remove Classroom', function (done) {
        Classroom.find({name: 'Sample 1'})
            .remove()
            .execQ()
            .then(function() { return done(); })
            .fail(done);
    });
});