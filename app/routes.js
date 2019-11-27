const express = require('express');
const router = express.Router();

router.use('/', require('./views/email/routes.js'));
router.use('/', require('./views/email/mvp/routes.js'));


router.get('/', (req, res) => {

  // Kill session data if returning to the index page of options
  req.session.destroy();

  res.render('index');

});


module.exports = router;
