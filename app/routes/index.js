'use strict';

const home = (app) => {
	app.get('/', (req, res) => {
		let homeCtl = new app.controllers.HomeCtl(app);
		homeCtl.index(req, res);
	});
	
	app.post('/autenticar', (req, res) => {
		let homeCtl = new app.controllers.HomeCtl(app);
		homeCtl.autenticar(req, res);
	});
};

module.exports = home;
