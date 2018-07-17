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

		if (!!req.session.validacao) {
			let validacao = req.session.validacao;
			// delete req.session.validacao;
			res.render('jogo', {
				img_casa: req.session.casa,
				jogo: req.session.jogo,
				msg: req.query.msg,
				validacao: validacao
			});
			return;
		}

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);

		jogoDAO.iniciaJogo(req, res);
	}

	static sair(req, res) {
		req.session.destroy((err) => {
			res.render('index', {validacao: {}});
		});
	}

	static suditos(req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
			return;
		}
		let validacao = {};
		if (!!req.session.validacao) {
			validacao = req.session.validacao;
			delete req.session.validacao;
		}

		res.render('aldeoes', {validacao: validacao});
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
		req.assert('qtd_suditos', 'A quantidade deve ser informada').notEmpty();

		let erros = req.validationErrors();

		if (erros) {
			req.session.validacao = erros;
			res.redirect('jogo');
			return;
		}

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);

		dadosForm.usuario = req.session.usuario;
		jogoDAO.acao(dadosForm);

		res.redirect('jogo?msg=B');
	}

	revogar_acao(req, res) {
		if (req.session.autorizado !== true) {
			res.redirect('/');
			return;
		}

		let _id = req.query.id_acao;

		let connection = this._app.infra.dbConnection;
		let jogoDAO = new this._app.models.JogoDAO(connection);

		jogoDAO.revogarAcao(_id, res);
	}
}

module.exports = () => JogoCtl;
