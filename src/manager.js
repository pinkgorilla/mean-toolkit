'use strict'
require('mongodb-toolkit');

module.exports = class Manager {
    constructor(db) {
        this.db = db;
    }
}