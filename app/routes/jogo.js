module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.jogoCtl.jogo(application, req, res);
	});
};