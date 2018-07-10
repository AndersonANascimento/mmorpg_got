'use strict';

class JogoCtl {
    constructor (app) {
        this._app = app;
	}
	
	jogo (req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
		}

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);

		jogoDAO.iniciaJogo(req, res);
	}

	sair (req, res) {
		req.session.destroy(function (err) {
			res.render('index', {validacao: {}});
		});
	}

	suditos (req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
		}

		res.render('aldeoes', {validacao: {}});
	}

	pergaminhos (req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
		}
		
		res.render('pergaminhos', {validacao: {}});
	}

	ordenar_acao_sudito (req, res) {
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
	}
}

module.exports = () => JogoCtl;
