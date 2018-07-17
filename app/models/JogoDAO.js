'use strict';

class JogoDAO {
	constructor(connection) {
		this._connection = connection();
		this._ObjectID = require('mongodb').ObjectId;
	}

	gerarParametros(usuario) {
		this._connection.open((err, db) => {
			db.collection("jogo", (err, jogos) => {
				jogos.insert({
					usuario: usuario,
					moeda: 15,
					suditos: 10,
					temor: Math.floor(Math.random() * 1000),
					sabedoria: Math.floor(Math.random() * 1000),
					comercio: Math.floor(Math.random() * 1000),
					magia: Math.floor(Math.random() * 1000)
				});

				db.close();
			});
		});
	}

	iniciaJogo(req, res) {
		this._connection.open((err, db) => {
			db.collection("jogo", (err, jogos) => {
				jogos.find({usuario: req.session.usuario}).toArray((err, result) => {
					req.session.jogo = result[0];
					res.render('jogo', {
						img_casa: req.session.casa,
						jogo: req.session.jogo,
						msg: req.query.msg,
						validacao: {}
					});
				});

				db.close();
			});
		});
	}

	acao(acao) {
		this._connection.open((err, db) => {
			db.collection("acao", (err, acoes) => {
				let date = new Date();
				let tempo = null;
				switch (parseInt(acao.acao)) {
					case 1:
						tempo = 60 * 60000;
						break;
					case 2:
						tempo = 2 * 60 * 60000;
						break;
					case 3:
						tempo = 5 * 60 * 60000;
						break;
					case 4:
						tempo = 5 * 60 * 60000;
						break;
				}
				acao.acao_termina_em = date.getTime() + tempo;
				acoes.insert(acao);

				// db.close();
			});

			db.collection("jogo", (err, jogos) => {
				let moedas = null;
				switch (parseInt(acao.acao)) {
					case 1:
						moedas = -2 * acao.qtd_suditos;
						break;
					case 2:
						moedas = -3 * acao.qtd_suditos;
						break;
					case 3:
						moedas = -1 * acao.qtd_suditos;
						break;
					case 4:
						moedas = -1 * acao.qtd_suditos;
						break;
				}
				jogos.update(
					{usuario: acao.usuario},
					{$inc: {moeda: moedas, suditos: (acao.qtd_suditos * -1)}}
				);

				db.close();
			});
		});
	}

	getAcoes(req, res) {
		this._connection.open((err, db) => {
			db.collection("acao", (err, acoes) => {
				let date = new Date();
				let momento_atual = date.getTime();

				acoes.find({
					usuario: req.session.usuario,
					acao_termina_em: {$gt: momento_atual}
				}).toArray((err, result) => {
					res.render('pergaminhos', {acoes: result});
				});

				db.close();
			});
		});
	}

	revogarAcao(id_acao, res) {
		this._connection.open((err, db) => {
			/* Recupera da acao os recursos investidos */
			db.collection("acao", (err, acoes) => {
				/* Remove a acao */
				acoes.find({_id: this._ObjectID(id_acao)}).toArray((err, acao) => {

					/* Devolve moedas e suditos */
					db.collection("jogo", (err, jogos) => {
						let moedas = null;
						let suditos = null;
						suditos = parseInt(acao[0].qtd_suditos);
						switch (parseInt(acao[0].acao)) {
							case 1:
								moedas = 2 * suditos;
								break;
							case 2:
								moedas = 3 * suditos;
								break;
							case 3:
								moedas = suditos;
								break;
							case 4:
								moedas = suditos;
								break;
						}

						jogos.findOneAndUpdate(
							{usuario: acao[0].usuario},
							{$inc: {moeda: moedas, suditos: suditos}}
						);

						acoes.findOneAndDelete({_id: this._ObjectID(id_acao)});

						db.close();
					});

					res.redirect('jogo?msg=D');
				});

			});
		});
	}
}

module.exports = () => JogoDAO;
