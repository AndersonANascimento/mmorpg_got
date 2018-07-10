'use strict';

const jogo = (apk) => {
	apk.get('/jogo', (req, res) => {
		let jogoCtl = new apk.controllers.JogoCtl(apk);
		jogoCtl.jogo(req, res);
	});
	
	apk.get('/suditos', (req, res) => {
		let jogoCtl = new apk.controllers.JogoCtl(apk);
		jogoCtl.suditos(req, res);
	});
	
	apk.get('/pergaminhos', (req, res) => {
		let jogoCtl = new apk.controllers.JogoCtl(apk);
		jogoCtl.pergaminhos(req, res);
	});
	
	apk.post('/ordenar_acao_sudito', (req, res) => {
		let jogoCtl = new apk.controllers.JogoCtl(apk);
		jogoCtl.ordenar_acao_sudito(req, res);
	});
	
	apk.get('/sair', (req, res) => {
		let jogoCtl = new apk.controllers.JogoCtl(apk);
		jogoCtl.sair(req, res);
	});
};

module.exports = jogo;
