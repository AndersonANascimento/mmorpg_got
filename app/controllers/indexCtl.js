module.exports.index = function (apk, req, res) {
	res.render('index', {validacao: {}});
};

module.exports.autenticar = function (apk, req, res) {
	
	var dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Password não pode ser vazio').notEmpty();

    var erros = req.validationErrors();
    
    if(erros) {
        res.render('index', {validacao: erros});
        return;
	}
	
	res.send(dadosForm);
}