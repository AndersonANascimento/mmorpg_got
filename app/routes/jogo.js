'use strict';

const jogo = (app) => {
	app.get('/jogo', (req, res) => {
		new app.controllers.JogoCtl(app).jogo(req, res);
	});

	app.get('/suditos', (req, res) => {
		app.controllers.JogoCtl.suditos(req, res);
	});

	app.get('/pergaminhos', (req, res) => {
		new app.controllers.JogoCtl(app).pergaminhos(req, res);
	});

	app.post('/ordenar_acao_sudito', (req, res) => {
		new app.controllers.JogoCtl(app).ordenar_acao_sudito(req, res);
	});

	app.get('/revogar_acao', (req, res) => {
		new app.controllers.JogoCtl(app).revogar_acao(req, res);
	});

	app.get('/sair', (req, res) => {
		app.controllers.JogoCtl.sair(req, res);
	});
};

module.exports = jogo;
