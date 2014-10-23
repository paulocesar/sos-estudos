var _ = require('lodash'),
    Q = require('q'),
    assert = require('assert'),
    m = require('../../src').models,
    User = m.User,
    Classroom = m.Classroom,
    UserInClassroom = m.UserInClassroom;



var t = User({
    username: 'professor',
    name: 'Professor da Silva',
    password: '123',
    role: User.role('teacher'),
    messages: []
});

var s = User({
    username: 'aluno',
    name: 'Aluno da Silva',
    password: '123',
    role: User.role('student'),
    messages: []
});

Q.all([
    t.saveQ(),
    s.saveQ()
])
.spread(function (teacher, student) {
    Classroom.createQ('Sample 1', '1234', teacher)
        .then(function (c) {
            console.log('creating lesson...');
            return c.createLessonQ('new Lesson');
        })
        .then(function (c) {
            console.log('add student...');
            return c.addStudentByIdQ(student._id);
        })
        .then(function (c) {
            console.log('add message...');
            return c.sendMessageQ(student, 'hello People!!!');
        })
        .fail(console.log);

    teacher.sendMessageQ(student, 'hello Teacher!!!')
        .fail(console.log);

    student.sendMessageQ(teacher, 'hello Student!!!')
        .fail(console.log);
});
