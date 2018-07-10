'use strict';

const home = (app) => {
	app.get('/', (req, res) => {
		app.controllers.HomeCtl.index(req, res);
	});
	
	app.post('/autenticar', (req, res) => {
		new app.controllers.HomeCtl(app).autenticar(req, res);
	});
};

module.exports = home;
