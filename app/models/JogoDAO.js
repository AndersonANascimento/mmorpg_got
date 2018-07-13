'use strict';

class JogoDAO {
	constructor(connection) {
		this._connection = connection();
		this._ObjectID = require('mongodb').ObjectId;
	}

	gerarParametros(usuario) {
		this._connection.open((err, mongoclient) => {
			mongoclient.collection("jogo", (err, collection) => {
				collection.insert({
					usuario: usuario,
					moeda: 15,
					suditos: 10,
					temor: Math.floor(Math.random() * 1000),
					sabedoria: Math.floor(Math.random() * 1000),
					comercio: Math.floor(Math.random() * 1000),
					magia: Math.floor(Math.random() * 1000)
				});

				mongoclient.close();
			});
		});
	}

	iniciaJogo(req, res) {
		this._connection.open((err, mongoclient) => {
			mongoclient.collection("jogo", (err, collection) => {
				collection.find({usuario: req.session.usuario}).toArray((err, result) => {
					res.render('jogo', {
						img_casa: req.session.casa,
						jogo: result[0],
						msg: req.query.msg
					});
				});

				mongoclient.close();
			});
		});
	}

	acao(acao) {
		this._connection.open((err, mongoclient) => {
			mongoclient.collection("acao", (err, collection) => {
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
				collection.insert(acao);

				// mongoclient.close();
			});

			mongoclient.collection("jogo", (err, collection) => {
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
				collection.update(
					{usuario: acao.usuario},
					{$inc: {moeda: moedas, suditos: (acao.qtd_suditos * -1)}}
				);

				mongoclient.close();
			});
		});
	}

	getAcoes(req, res) {
		this._connection.open((err, mongoclient) => {
			mongoclient.collection("acao", (err, collection) => {
				let date = new Date();
				let momento_atual = date.getTime();

				collection.find({
					usuario: req.session.usuario,
					acao_termina_em: {$gt: momento_atual}
				}).toArray((err, result) => {
					res.render('pergaminhos', {acoes: result});
				});

				mongoclient.close();
			});
		});
	}

	revogarAcao(id_acao, res){
		let usuario = null;
		let moedas = null;
		let suditos = null;
		this._connection.open((err, mongoclient) => {
			/* Recupera da acao os recursos investidos */
			mongoclient.collection("acao", (err, collection) => {
				collection.find({_id: this._ObjectID(id_acao)}).toArray((err, result) => {
					usuario = result.usuario;
					suditos = parseInt(result.qtd_suditos);
					switch (parseInt(result.acao)) {
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
				});
			});
			/* Devolve moedas e suditos */
			mongoclient.collection("jogo", (err, collection) => {
				collection.update(
					{usuario: usuario},
					{$inc: {moeda: moedas, suditos: suditos}}
				);
			});
			/* Remove a acao */
			mongoclient.collection("acao", (err, collection) => {
				collection.remove({_id: this._ObjectID(id_acao)}, (err, result) => {
					res.redirect('jogo?msg=D');

					mongoclient.close();
				});
			});

		});
	}
}

module.exports = () => JogoDAO;
