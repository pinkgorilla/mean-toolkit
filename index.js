require('./src/mongodb/collection-ext');

module.exports = {
    passport: {
        local: require('./src/passport/passport-local'),
        jwt: require('./src/passport/passport-jwt')
    },
    middlewares: {
        enableCors: require('./src/middlewares/enable-cors')
    },
    Manager: require('./src/manager'),
    Controller: require('./src/controller')
} 