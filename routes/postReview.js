var express = require('express');
var router = express.Router();

// GET /postreview
// For now a separate page (don't use angular for now)
router.get('/postreview', function(req, res, next) {
    res.render('postreview');
});

router.post('/postreview', function(req, res, next) {
    
})

module.exports = router;
