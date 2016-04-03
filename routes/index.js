const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'VPRO Tegenlicht'
  });
});

router.get('/voor-uitzending', (req, res, next) => {
  res.render('voor-uitzending', {
    title: 'VPRO Tegenlicht'
  });
});

router.get('/gesprek', (req, res, next) => {
  res.render('gesprek', {
    title: 'VPRO Tegenlicht'
  });
});

module.exports = router;
