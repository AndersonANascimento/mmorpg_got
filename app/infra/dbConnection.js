'use strict';

/* importar o mongodb */
const mongodb = require('mongodb');

const connMongoDB = function () {
	return new mongodb.Db(
        'got',
        new mongodb.Server(
            '192.168.0.7',
            27017, {}
        ), {}
    );
};

module.exports = () => connMongoDB;
