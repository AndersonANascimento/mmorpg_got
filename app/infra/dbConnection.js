'use strict';

/* importar o mongodb */
const mongodb = require('mongodb');

const connMongoDB = function () {
    const db = new mongodb.Db(
        'got',
        new mongodb.Server(
            '192.168.0.7',
            27017, {}
        ), {}
    );

    return db;
};

module.exports = () => connMongoDB;
