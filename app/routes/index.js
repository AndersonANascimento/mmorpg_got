module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.indexCtl.index(application, req, res);
	});
}