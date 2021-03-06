'use strict';

class UsuariosDAO {
    constructor (connection) {
        this._connection = connection();
        this._crypto = require('crypto').createHash('md5');
        //console.log(this._connection);
    }

    inserirUsuario (usuario) {
        this._connection.open((err, db) => {
            db.collection("usuarios", (err, usuarios) => {
                usuario.senha = this._crypto.update(usuario.senha).digest('hex');
                usuarios.insert(usuario);

                db.close();
            });
        });
    };

    login (usuario, req, res) {
        this._connection.open((err, db) => {
            db.collection("usuarios", (err, usuarios) => {
				usuario.senha = this._crypto.update(usuario.senha).digest('hex');
                // collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}}).toArray((err, result) => {
				usuarios.find(usuario).toArray((err, user) => {
                    if (user[0] !== undefined) {
                        req.session.autorizado = true;
                        
                        req.session.usuario = user[0].usuario;
                        req.session.casa = user[0].casa;
                    }

                    if (req.session.autorizado) {
                        res.redirect('jogo');
                    } else {
                        res.render('index', {validacao: [{msg: "Usuário/Senha inválida ou não cadastrada!"}]});
                    }
                });

                db.close();
            });
        });
    };
}

module.exports = () => UsuariosDAO;
