/* importar o mongodb */
let mongodb = require('mongodb');

let connMongoDB = function () {
    let db = new mongodb.Db(
        'got',
        new mongodb.Server(
            '192.168.33.10',
            27017, {}
        ), {}
    );

    return db;
};

module.exports = function () {
    return connMongoDB;
};