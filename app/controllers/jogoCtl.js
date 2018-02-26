'use strict';

module.exports.jogo = function (apk, req, res) {
	if (req.session.autorizado !== true) {
		res.redirect('/');
	}

	let connection = apk.config.dbConnection;
	let JogoDAO = new apk.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(req, res);
	
};

module.exports.sair = function (apk, req, res) {
	req.session.destroy(function (err) {
		res.render('index', {
			validacao: {}
		});
	});
};

module.exports.suditos = function (apk, req, res) {
	if (req.session.autorizado !== true) {
		res.redirect('/');
	}

	res.render('aldeoes', {validacao: {}});
};

module.exports.pergaminhos = function (apk, req, res) {
	if (req.session.autorizado !== true) {
		res.redirect('/');
	}
	
	res.render('pergaminhos', {validacao: {}});
};

module.exports.ordenar_acao_sudito = function (apk, req, res) {
	if (req.session.autorizado !== true) {
		res.redirect('/');
	}
	
	let dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();

	let erros = req.validationErrors();

	if(erros) {
		res.redirect('jogo?comando_invalido=S');
		return;
	}
	console.log(dadosForm);
	res.send('tudo ok!');
};
