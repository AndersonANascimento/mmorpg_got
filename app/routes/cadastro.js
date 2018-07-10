'use strict';

const cadastro = (apk) => {
	apk.get('/cadastro', (req, res) => {
		let cadastroCtl = new apk.controllers.CadastroCtl(apk);
		cadastroCtl.cadastro(req, res);
	});
	
	apk.post('/cadastrar', (req, res) => {
		let cadastroCtl = new apk.controllers.CadastroCtl(apk);
		cadastroCtl.cadastrar(req, res);
	});
};
	
module.exports = cadastro;