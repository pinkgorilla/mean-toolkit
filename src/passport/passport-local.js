 var passportLocal = (function () {
    var instance = null;

    function initialize() {
        return new function () {
            var passport = require('passport');
            
            this.strategy = function (strategy) {
                var LocalStrategy = require('passport-local').Strategy;
                passport.use(new LocalStrategy(strategy));
            };

            this.authenticate = function (options) {
                return passport.authenticate('local', options);
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

module.exports = passportLocal;