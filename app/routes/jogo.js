'use strict';

module.exports = function(apk){
	apk.get('/jogo', function(req, res){
		apk.app.controllers.jogoCtl.jogo(apk, req, res);
	});

	apk.get('/suditos', function(req, res){
		apk.app.controllers.jogoCtl.suditos(apk, req, res);
	});

	apk.get('/pergaminhos', function(req, res){
		apk.app.controllers.jogoCtl.pergaminhos(apk, req, res);
	});

	apk.post('/ordenar_acao_sudito', function(req, res){
		apk.app.controllers.jogoCtl.ordenar_acao_sudito(apk, req, res);
	});

	apk.get('/sair', function(req, res){
		apk.app.controllers.jogoCtl.sair(apk, req, res);
	});
};