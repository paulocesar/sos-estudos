var Q = require('q')
  , _ = require('lodash')
  , Model = require('../requires').Model;


//IMPORTANT: CANNOT CHANGE THE ORDER!
var roles = [
 'admin',
 'teacher',
 'student'
];

module.exports = Model({
    name: 'User',

    schema: {
        username: String,
        name: String,
        email: String,
        password: String,
        role: Number,
        image: String,
        messages: [{
            user_id: { type: ObjectId, ref: 'User' },
            message: String,
            date: Date
        }],
        classrooms: [{
            type: ObjectId, ref: 'Classroom'
        }]
    },

    methods: {
        isAdmin: function () { return roles[this.role] === 'admin'; },
        isTeacher: function () { return roles[this.role] === 'teacher'; },
        isStudent: function () { return roles[this.role] === 'student'; },

        canCreateClass: function () {
            var r = roles[this.role];
            return r === 'teacher' || r === 'admin';
        },

        changePasswordQ: function (password) {
            //TODO: ENCRYPT PASSWORD
            var p = password;
            this.password = p;

            return this.saveQ();
        },

        checkPassword: function (password) {
            //TODO: ENCRYPT PASSWORD
            return this.password == password;
        },

        sendMessageQ: function (user, message) {
            var id = user._id || user;

            this.messages.unshift({
                user_id: id,
                message: message,
                date: new Date()
            });

            this.markModified('messages');

            return this.saveQ();
        },

        addClassroomQ: function (classroom) {

            if (!_.contains(this.classrooms, classroom._id)) {
                this.classrooms.push(classroom._id);
                this.markModified('classrooms');
            }

            return this.saveQ();
        },

        removeClassroomQ: function (classroom) {
            this.classrooms.remove(user._id);
            return this.saveQ();
        }
    },

    statics: {
        isAdmin: function (u) { return roles[u.role] === 'admin'; },
        isTeacher: function (u) { return roles[u.role] === 'teacher'; },
        isStudent: function (u) { return roles[u.role] === 'student'; },

        role: function (role) { return roles.indexOf(role); },

        studentsQ: function () {
            var roleId = User.role('student');
            return this.findByRole(roleId).execQ()
        },

        createUserQ: function (data) {
            var roleId = roles.indexOf(data.role);
            data.role = (roleId >= 0) ? roleId : User.role('student');

            //TODO: encrypt password
            data.password = data.password;

            return (new this(data)).saveQ();
        },

        getAllUserDataQ: function (username) {
            return this.findOne({username: username})
                .select('_id username name email role image classrooms messages __v')
                .populate({
                    path: 'classrooms',
                    select: '_id name user_id online __v',
                    match: { active: true }
                })
                .populate({
                    path: 'messages',
                    options: { limit: 10 }
                })
                .execQ();
        }
    }
});
