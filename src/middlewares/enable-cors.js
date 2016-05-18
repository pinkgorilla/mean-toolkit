module.exports = function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization");
    if ('OPTIONS' == request.method) {
        response.sendStatus(204);
    }
    else {
        next();
    }
}