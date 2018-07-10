'use strict';

class HomeCtl {
    constructor (app) {
        this._app = app;
    }

    index (req, res) {
        res.render('index', {validacao: {}});
    };

    autenticar (req, res) {

        let dadosForm = req.body;

        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Password não pode ser vazio').notEmpty();

        let erros = req.validationErrors();

        if (erros) {
            res.render('index', {validacao: erros});
            return;
        }

        let connection = this._app.infra.dbConnection;
        let UsuariosDAO = new this._app.models.UsuariosDAO(connection);

        UsuariosDAO.autenticar(dadosForm, req, res);

    };
}

module.exports = () => HomeCtl;