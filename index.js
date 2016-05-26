require('./src/mongodb/collection-ext');

module.exports = {
    passport: {
        local: require('./src/passport/passport-local'),
        jwt: require('./src/passport/passport-jwt')
    },
    middlewares: {
        enableCors: require('./src/middlewares/enable-cors'),
        errorFormatter: require('./src/middlewares/error-formatter'),
        resultFormatter: require('./src/middlewares/result-formatter')
    },
    Manager: require('./src/manager'),
    Service: require('./src/service')
} 