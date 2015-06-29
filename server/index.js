var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('./db/db.js');
var monk = require('monk');
var monkdb = monk('mongodb://localhost/amherstscrutiny');


// mongoose.connect('mongodb://localhost/amherstscrutiny');

var app = express();
var router = express.Router();
// MIDDLEWARE
// =============================================================
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// Make db available to router
app.use(function(req, res, next) {
  // req.db = mongoose;
  req.db = monkdb;
  next();
})


// ROUTING
// =============================================================
// var indexRouter = require('../routes/index');
// var resultsRouter = require('../routes/results');

// app.use('/', indexRouter);
// app.use('/results', resultsRouter);

app.use(router);

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/api/results', function(req, res, next) {
  // Mongoose query with data.
  console.log('Processing: ');
  console.log(req.body);
  // console.log('Response object: ');
  // console.log(res);
  // console.log('DB');
  // console.log(req.db);
  var collection = req.db.get('reviews');
  // console.log('Collection: ');
  // console.log(collection);
  var query = collection.find({}, {}, function(err, reviews) {
    console.log("Queries returned: ");
    console.log(reviews);
    res.send(reviews);
  });

  // res.send(req.body);
});


router.get('/results', function(req, res, next) {
  console.log(req.query);
  res.locals.query = req.query;
  res.render('results');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// ERROR HANDLERS
// =============================================================

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
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
