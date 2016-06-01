'use strict'

module.exports = class Controller {
    constructor(version, options) {
        this.version = version || '0.0.0';
        var express = require('express');
        this.router = express.Router();
        this.options = Object.assign({}, options, { jwt: { secret: 'secret', expiresIn: 86400 } });

        this.initializeRouter(this.router);

        this.setResultFormatter(this.router);
        this.setErrorFormatter(this.router);
    }

    initializeRouter(router) {
        throw new Error('initializeRouter is not implemented');
    }

    setResultFormatter(router) {
        router.use((request, response, next) => {
            var data = response.locals.data;
            response.json({
                'apiVersion': this.version,
                'data': data
            });
        })
    }

    setErrorFormatter(router) {
        router.use((error, request, response, next) => {
            response.json({
                'apiVersion': this.version,
                'error': {
                    message: error.message || error
                }
            });
        });
    }
}