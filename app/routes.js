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


module.exports = router;
