'use strict';

const cadastro = (app) => {
	app.get('/cadastro', (req, res) => {
		app.controllers.CadastroCtl.cadastro(req, res);
	});
	
	app.post('/cadastrar', (req, res) => {
		new app.controllers.CadastroCtl(app).cadastrar(req, res);
	});
};
	
module.exports = cadastro;