var initialized = false;
(function () {

    var Collection = require('mongodb').Collection;

    if (Collection && !initialized) {


        Collection.prototype.dbFirst = function (query) {
            return new Promise((resolve, reject) => {

                this.find(Object.assign({}, query))
                    .limit(1)
                    .next()
                    .then(data => {
                        if (!data)
                            reject(this.s.name + ': no item in the collection');
                        resolve(data);
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        };

        Collection.prototype.dbFirstOrDefault = function (query) {
            return new Promise((resolve, reject) => {
                this.dbFirst(query)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(e => resolve(null));
            });
        }


        Collection.prototype.dbSingle = function (query) {
            return new Promise((resolve, reject) => {
                this.dbFirst(query)
                    .then(data => {
                        if (!data)
                            reject(this.s.name + ': data not found');
                        resolve(data);
                    })
                    .catch(e => resolve(null));
            });
        };

        Collection.prototype.dbSingleOrDefault = function (query) {
            return new Promise((resolve, reject) => {
                this.dbSingle(query)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(e => resolve(null));
            });
        };

        Collection.prototype.dbInsert = function (data) {
            return new Promise((resolve, reject) => {

                this
                    .insertOne(data)
                    .then(result => {
                        if (result.insertedCount < 1)
                            reject(this.s.name + ": failed to insert");
                        else {
                            var id = result.insertedId;
                            this.dbSingle({ _id: id })
                                .then(data => {
                                    resolve(data);
                                })
                                .catch(e => reject(e));
                        }
                    })
                    .catch(e => reject(e));
            });
        };

        Collection.prototype.dbUpdate = function (query, updateObject, skipStampCheck) {

            return new Promise((resolve, reject) => {

                this.dbSingle(query)
                    .then(doc => {
                        delete updateObject._id;
                        this.updateOne(query, { $set: updateObject })
                            .then(result => {
                                this.dbSingle(query)
                                    .then(redoc => {
                                        resolve(redoc);
                                    })
                                    .catch(e => reject(e));
                            })
                            .catch(e => reject(e));
                    })
                    .catch(e => reject(e));
            });
        };

        initialized = true;
    }
})();