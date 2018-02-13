module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastroCtl.cadastro(application, req, res);
	});

	application.post('/cadastrar', function(req, res){
		application.app.controllers.cadastroCtl.cadastrar(application, req, res);
	});
}