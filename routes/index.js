var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
	res.sendfile('./views/index.html');
});

router.get('/tmp', function(req, res){
	//console.log(req.param("url"));
	//console.log(req.param("js"));
	var phantom = require('phantom');
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open(req.param("url"), function (status) {
				page.includeJs("http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js", function(){
					console.log("open ? : status ? ", req.param("url"), status);
	        page.evaluate(function (data) { return eval(data.js);}
					, function (r) {
						res.send({result: r});
						ph.exit();
					}, {js: req.param("js")});
				});
	    });
	  });
	});
});

module.exports = router;
