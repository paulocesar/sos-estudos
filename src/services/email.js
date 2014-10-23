var nodemailer = require('nodemailer'),
    Q = require('q'),
    _ = require('lodash'),
    config = require('../../config'),
    transporter = nodemailer.createTransport(config.nodemailer);

var email = {};

module.exports = email;

_.extend(email, {

    sendEmailQ: function (to, subject, message, text) {
        var d = Q.defer();

        var mailOptions = {
            from: config.nodemailer.defaultName +
                ' <' + config.nodemailer.auth.user + '>',
            to: to,
            subject: subject,
            html: message,
            text: text || ''
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return d.reject(err);
            }
            d.resolve(info);
        });

        return d.promise;
    }

});
