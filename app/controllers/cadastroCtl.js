'use strict';

class CadastroCtl {
    constructor (app) {
        this._app = app;
    }

    static cadastro (req, res) {
        res.render('cadastro', {validacao: {}, dadosForm: {}});
    }

    cadastrar (req, res) {
        let dadosForm = req.body;

        req.assert('nome', 'Nome não pode ser vazio').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Password não pode ser vazio').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio').notEmpty();

        let erros = req.validationErrors();

        if (erros) {
            res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
            return;
        }

        let connection = this._app.infra.dbConnection;
        let usuariosDAO = new this._app.models.UsuariosDAO(connection);
        let jogoDAO = new this._app.models.JogoDAO(connection);

        usuariosDAO.inserirUsuario(dadosForm);
        jogoDAO.gerarParametros(dadosForm.usuario);

        res.render('index', {validacao: {msg: "Cadastro efetuado com sucesso!"}});
    }
}

module.exports = () => CadastroCtl;
