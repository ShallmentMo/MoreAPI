var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var handlebars = require('handlebars');
var fs = require('fs');

var routes = require('./routes/index');

var app = express();

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apis');
var Schema = mongoose.Schema;
var API = new Schema({
  url: { type: String, required: true},
	command: { type: String, required: true},
});
var APIModel = mongoose.model('API', API);
/*
var product = new APIModel({
	url : 'http://store.apple.com/hk-zh/browse/home/specialdeals/mac/macbook_pro/15',
	command : '$("table")'
})
product.save();
*/

// view engine setup
app.engine("html", consolidate.handlebars);
app.set("view engine", "html");
app.set('views', path.join(__dirname, 'views'));

// Register partials
var partials = "./views/partials/";
fs.readdirSync(partials).forEach(function (file) {
  var source = fs.readFileSync(partials + file, "utf8"),
  partial = /(.+)\.html/.exec(file).pop();
  Handlebars.registerPartial(partial, source);
})

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
				console.log(err.message);
				console.log(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
