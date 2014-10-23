module.exports = {
    port: 1111,
    index: '/site/index',
    loggedInIndex: '/home/index',
    bbb: {
        url: 'http://localhost/bigbluebutton',
        secrect: '9999999999999999999999999999999'
    },
    nodemailer: {
        service: 'gmail',
        defaultName: 'Sample Name',
        auth: {
            user: 'email@email.com',
            pass: 'password'
        }
    }
};
