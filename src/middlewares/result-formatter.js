module.exports = function (request, response, next) {
    var apiVersion = response.locals.apiVersion || '0.0.0';
    var data = response.locals.data;
    response.json({
        'apiVersion': apiVersion,
        'data': data
    });
}