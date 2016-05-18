module.exports = function (error, request, response, next) {
    var apiVersion = response.locals.apiVersion || '0.0.0';
    response.json({
        'apiVersion': apiVersion,
        'error': {
            message: error.message || error
        }
    });
};