var express = require('express');
var router = express.Router();

router.post('/results', function(req, res, next) {
  console.log(req.body);
  res.render('results');
})

module.exports = router;