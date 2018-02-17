module.exports.cadastro = function (apk, req, res) {
    res.render('cadastro', {
        validacao: {},
        dadosForm: {}
    });
};

module.exports.cadastrar = function (apk, req, res) {
    let dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Password não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();

    let erros = req.validationErrors();

    if (erros) {
        res.render('cadastro', {
            validacao: erros,
            dadosForm: dadosForm
        });
        return;
    }

    let connection = apk.config.dbConnection;
    let UsuariosDAO = new apk.app.models.UsuariosDAO(connection);
    let JogoDAO = new apk.app.models.JogoDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);

    res.send('Podemos cadastrar');

};