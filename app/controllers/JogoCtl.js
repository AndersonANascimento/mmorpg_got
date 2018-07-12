'use strict';

class JogoCtl {
	constructor(app) {
		this._app = app;
	}

	jogo(req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
			return;
		}

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);
		jogoDAO.iniciaJogo(req, res);
	}

	static sair(req, res) {
		req.session.destroy(function (err) {
			res.render('index', {validacao: {}});
		});
	}

	static suditos(req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
			return;
		}

		res.render('aldeoes', {validacao: {}});
	}

	pergaminhos(req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
			return;
		}

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);

		jogoDAO.getAcoes(req, res);
	}

	ordenar_acao_sudito(req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
			return;
		}

		let dadosForm = req.body;

		req.assert('acao', 'Ação deve ser informada').notEmpty();
		req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();

		let erros = req.validationErrors();

		if (erros) {
			res.redirect('jogo?msg=A');
			return;
		}

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);

		dadosForm.usuario = req.session.usuario;
		jogoDAO.acao(dadosForm);

		res.redirect('jogo?msg=B');
	}
}

module.exports = () => JogoCtl;
