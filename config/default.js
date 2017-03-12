module.exports = {
    port: 3000,
    session: {
        secret: 'travel',
        key: 'travel',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/travel'
};