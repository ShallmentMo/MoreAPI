var phantom = require('phantom');

phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://www.baidu.com", function (status) {
    console.log("opened google? ", status);
		console.log(page);
     var result = page.evaluate(function (content) { return content; }, function (result) {
			 console.log(result);
     console.log('Page title is ' + result);
      ph.exit();
      }, {message: "hello"});
   });
  });
});

