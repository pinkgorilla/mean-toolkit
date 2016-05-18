var passportJwt = (function () {
    var instance = null;

    function initialize() {
        return new function () {
            var passport = require('passport');

            this.strategy = function (strategy, secret) {
                var JwtStrategy = require('passport-jwt').Strategy;
                var ExtractJwt = require('passport-jwt').ExtractJwt;
                
                var options = {};
                options.jwtFromRequest = ExtractJwt.fromAuthHeader();
                options.secretOrKey = secret;
                
                passport.use(new JwtStrategy(options, strategy));
            };

            this.authenticate = function (options) {
                return passport.authenticate('jwt', options);
            }
        };
    }

    function _getInstance() {
        if (!instance)
            instance = initialize();
        return instance;
    };

    return _getInstance();

})();

module.exports = passportJwt;