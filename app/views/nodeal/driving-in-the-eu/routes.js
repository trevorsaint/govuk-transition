const express = require('express');
const router = express.Router();


router.get('/current-guidance', (req, res) => {
  res.render('current-guidance');
});

router.get('/existing-withdrawn', (req, res) => {
  res.render('existing-withdrawn');
});

router.get('/google-search-results', (req, res) => {
  res.render('google-search-results');
});

router.get('/options/1', (req, res) => {
  res.render('1');
});

router.get('/options/2', (req, res) => {
  res.render('2');
});


module.exports = router;
