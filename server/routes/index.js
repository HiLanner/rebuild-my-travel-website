module.exports = function (app) {
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/strategy', require('./strategys'));
    app.use('/upload', require('./upload-file.js'))
};