var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET users listing. */
router.post('/preshow', (req, res, next) => {
  console.log(req.body);
  res.redirect(303, '/polls');
});

router.get('/resultaten', (req, res, next) => {
  res.render('results', {title: 'VPRO Tegenlicht'});
});

router.get('/', (req, res, next) => {
  res.render('polls', { title: 'VPRO Tegenlicht' });
});

module.exports = router;
