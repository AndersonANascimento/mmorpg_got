module.exports = function(apk){
	apk.get('/', function(req, res){
		apk.app.controllers.indexCtl.index(apk, req, res);
	});
	
	apk.post('/autenticar', function(req, res) {
		apk.app.controllers.indexCtl.autenticar(apk, req, res);
	});
}