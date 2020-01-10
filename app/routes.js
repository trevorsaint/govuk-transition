const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.use('/', require('./views/nodeal/driving-in-the-eu/routes'));
router.use('/', require('./views/nodeal/export-fish/routes'));

module.exports = router;
