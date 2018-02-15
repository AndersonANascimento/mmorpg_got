module.exports = function(apk){
	apk.get('/jogo', function(req, res){
		apk.app.controllers.jogoCtl.jogo(apk, req, res);
	});

	apk.get('/sair', function(req, res){
		apk.app.controllers.jogoCtl.sair(apk, req, res);
	});
};