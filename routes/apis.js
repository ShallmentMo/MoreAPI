var express = require('express');
var router = express.Router();

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apis');
var Schema = mongoose.Schema;
var API = new Schema({
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

/* CREATE new api */
router.post('/', function(req, res){
	res.send({api: {}});
})

module.exports = router;
