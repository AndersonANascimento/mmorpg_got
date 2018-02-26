'use strict';

module.exports.index = function (apk, req, res) {
    res.render('index', {
        validacao: {}
    });
};

module.exports.autenticar = function (apk, req, res) {

    let dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Password não pode ser vazio').notEmpty();

    let erros = req.validationErrors();

    if (erros) {
        res.render('index', {
            validacao: erros
        });
        return;
    }

    let connection = apk.config.dbConnection;
    let UsuariosDAO = new apk.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);

    //res.send(dadosForm);
};