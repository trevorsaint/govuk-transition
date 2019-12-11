const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index');
});


// Move to a different routes folder
router.get('/nodeal/1', (req, res) => {
  res.render('nodeal/index');
});

router.get('/nodeal/2', (req, res) => {
  res.render('nodeal/index2');
});

router.get('/nodeal/3', (req, res) => {
  res.render('nodeal/index3');
});

router.get('/nodeal/4', (req, res) => {
  res.render('nodeal/index4');
});


module.exports = router;
