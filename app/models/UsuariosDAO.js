'use strict';

class UsuariosDAO {
    constructor (connection) {
        this._connection = connection();
        //console.log(this._connection);
    }

    inserirUsuario (usuario) {
        this._connection.open((err, mongoclient) => {
            mongoclient.collection("usuarios", (err, collection) => {
                collection.insert(usuario);

                mongoclient.close();
            });
        });
    };

    autenticar (usuario, req, res) {
        this._connection.open((err, mongoclient) => {
            mongoclient.collection("usuarios", (err, collection) => {
                // collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}}).toArray((err, result) => {
                collection.find(usuario).toArray((err, result) => {
                    if (result[0] !== undefined) {
                        console.log(result);
                        req.session.autorizado = true;
                        
                        req.session.usuario = result[0].usuario;
                        req.session.casa = result[0].casa;
                    }

                    if (req.session.autorizado) {
                        res.redirect('jogo');
                    } else {
                        res.render('index', {validacao: [{msg: "Usuário/Senha inválida ou não cadastrada!"}]});
                    }
                });

                mongoclient.close();
            });
        });
    };
}

module.exports = () => UsuariosDAO;
