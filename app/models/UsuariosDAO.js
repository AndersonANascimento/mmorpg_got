function UsuariosDAO(connection) {
    this._connection = connection;
    //console.log(this._connection);
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (err, collection) {
            collection.insert(usuario);
            mongoclient.close();
        });
    });
    console.log(usuario);
}

module.exports = function () {
    return UsuariosDAO;
};
