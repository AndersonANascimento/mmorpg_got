module.exports.jogo = function (apk, req, res) {
	if (req.session.autorizado) {
		res.render('jogo');
	} else {
//		res.send('Usuário precisa efetuar Login');
/* 		res.render('index', {
			validacao: [{msg: 'Usuário precisa efetuar Login'}]
		});
 */		res.redirect('/');

	}
};

module.exports.sair = function (apk, req, res) {
	req.session.destroy(function (err) {
		res.render('index', {
			validacao: {}
		});
	});
};