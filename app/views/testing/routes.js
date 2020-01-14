const express = require('express');
const router = express.Router();

router.get('/google', (req, res) => {
  res.render('testing/index');
});

router.get('/driving-in-the-eu', (req, res) => {
  res.render('testing/driving-in-the-eu/index');
});

router.get('/driving-in-the-eu/driving-abroad', (req, res) => {
  res.render('testing/driving-in-the-eu/driving-abroad/index');
});

module.exports = router;
