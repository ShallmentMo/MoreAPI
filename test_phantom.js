var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('http://store.apple.com/hk-zh/browse/home/specialdeals/mac/macbook_pro/15', function(status) {
	page.includeJs("http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js", function() {
		if (status !== 'success') {
			console.log('Unable to access network');
		} else {
			var ua = page.evaluateJavaScript("function() {" + 
		   "return jQuery('table').first().html();" +
	    "}");
			console.log(ua);
		}
	 phantom.exit();
	});
});
