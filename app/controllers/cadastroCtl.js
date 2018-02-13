module.exports.cadastro = function (apk, req, res) {
    res.render('cadastro', {validacao: {}, dadosForm: {}});
};

module.exports.cadastrar = function (apk, req, res) {
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Password não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();

    var erros = req.validationErrors();
    
    if(erros) {
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
        return;
    }

    let connection = apk.config.dbConnection;
    console.log(connection);
    
    let UsuariosDAO = new apk.app.models.UsuariosDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);

    res.send('Podemos cadastrar');

};