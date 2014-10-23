var _ = require('lodash'),
    assert = require('assert'),
    m = require('../../src').models,
    User = m.User,
    Classroom = m.Classroom
    UserInClassroom = m.UserInClassroom;


Classroom.find({name: 'Sample 1'})
    .removeQ()
    .fail(console.log);

User.find({username: {$in: ['professor', 'aluno']}})
    .removeQ()
    .fail(console.log);
