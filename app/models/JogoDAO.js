'use strict';

class JogoDAO {
	constructor(connection) {
		this._connection = connection();
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
						comando_invalido: (req.query.comando_invalido === 'S') ? 'S' : 'N'
					});
				});

				mongoclient.close();
			});
		});
	}

	acao(acao, req, res) {
		this._connection.open((err, mongoclient) => {
			mongoclient.collection("acao", (err, collection) => {
				let date = new Date();
				let tempo = null;
				switch (acao.acao) {
					case 1:
						tempo = 1 * 60 * 60000;
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

				mongoclient.close();
			});
		});
	}
}

module.exports = () => JogoDAO;
