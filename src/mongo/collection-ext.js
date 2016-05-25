var mongo = require('mongodb');
var ext = (function (collection) {
    
    if (collection)
    { 
        collection.prototype.single = function(lambda){
            
        }    
    }
})(mongo.Collection);