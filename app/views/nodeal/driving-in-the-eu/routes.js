const express = require('express');
const router = express.Router();


router.get('/current-guidance', (req, res) => {
  res.render('current-guidance');
});

router.get('/existing-withdrawn', (req, res) => {
  res.render('existing-withdrawn');
});

router.get('/options/1', (req, res) => {
  res.render('1');
});

router.get('/options/2', (req, res) => {
  res.render('2');
});

router.get('/options/3', (req, res) => {
  res.render('3');
});

router.get('/options/4', (req, res) => {
  res.render('4');
});


module.exports = router;
