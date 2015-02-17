var express = require('express');
var router = express.Router();

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apis');
var Schema = mongoose.Schema;
var API = new Schema({
	title: {type: String, required: true},
  url: { type: String, required: true},
	command: { type: String, required: true},
});
var APIModel = mongoose.model('API', API);

/* GET all apis */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
	APIModel.find(function(err, apis){
		if (err) return console.error(err);
		res.send({apis: apis});
	});
});

// GET one api
router.get('/:id', function(req, res){
})

/* CREATE new api */
router.post('/create', function(req, res){
	//console.log(req.param("title"));
	var api = new APIModel();
	api.url = req.param("url");
	api.command = req.param("command");
	api.title = req.param("title");
	api.save(function(err, api, numberAffected){
		res.send({api: api});
	})
})

// Save api
router.post('/save/:id', function(req, res){
	var id = req.params.id;
	var api = APIModel.findOne({_id: id}, function(error, api){
		api.url = req.param("url");
		api.command = req.param("command");
		api.title = req.param("title");
		api.save(function (err, api, numberAffected) {
			res.send({api: api});
		})
	})
})

// Try api
router.post('/try/:id', function(req, res){
	var id = req.params.id;
	var api = APIModel.findOne({_id: id}, function(error, api){
		var phantom = require('phantom');
		phantom.create(function (ph) {
			ph.createPage(function (page) {
				page.open(api.url, function (status) {
					page.includeJs("http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js", function() {
						if (status !== 'success') {
							console.log('Unable to access network');
							res.send({code: 404});
						} else {
							console.log(ph.getCookies());
							page.evaluate('function(){return ' + api.command + ';}', function(result){
								res.send({code: 200, result: result});
								ph.exit();
							});
						}
					});
				});
			});
		});
	});
})

module.exports = router;
