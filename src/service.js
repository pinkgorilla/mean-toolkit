'use strict' 
module.exports = class Service {
    constructor(version) {
        this.apiVersion = version;
    }

    version(request, response, next) {
        response.locals.apiVersion = this.apiVersion;
        next();
    }

    connectDb(connectionString) {
        return new Promise(function (resolve, reject) {
            var factory = require('mongo-factory');
            factory.getConnection(connectionString)
                .then(db => resolve(db))
                .catch(e => reject(e));
        });
    }
}