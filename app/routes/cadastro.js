'use strict';

module.exports = function(apk){
	apk.get('/cadastro', function(req, res){
		apk.app.controllers.cadastroCtl.cadastro(apk, req, res);
	});

	apk.post('/cadastrar', function(req, res){
		apk.app.controllers.cadastroCtl.cadastrar(apk, req, res);
	});
};