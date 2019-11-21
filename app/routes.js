const express = require('express');
const router = express.Router();

router.use('/', require('./views/email/routes.js'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
