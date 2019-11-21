const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');


// Get email updates
router.post('/email',

  [
    check('your-email')
      .not()
      .isEmpty()
      .withMessage('Enter your email address'),

    check('your-email')
      .isEmail()
      .withMessage('Enter a valid email address')
  ],

  function(req, res) {

    var errors = validationResult(req).array()[0];

    if(errors) {

      var summaryError;
      var inlineError = errors.msg;
      var pageObject;

      if (inlineError != 'Enter your email address') {
        summaryError = inlineError;
      } else {
        summaryError = 'You must provide your email address'
      }

      pageObject = {
        errors: errors,
        summaryError: summaryError,
        inlineError: {
          text: inlineError
        }
      }

      res.render('email/index', pageObject);

    } else {

      res.redirect('/email/get-updated');

    }

});



// When do you want to be updated about changes?
router.post('/email/get-updated',

  [
    check('get-updated')
      .not()
      .isEmpty()
      .withMessage('Choose when you want to receive updates'),
  ],

  function(req, res) {

    var errors = validationResult(req).array()[0]; // Just get one error

    if(errors) {

      var summaryError;
      var inlineError = errors.msg;
      var pageObject;

      if (inlineError != 'Choose when you want to receive updates') {
        summaryError = inlineError;
      } else {
        summaryError = 'You must choose when you want to receive updates'
      }

      pageObject = {
        errors: errors,
        summaryError: summaryError,
        inlineError: {
          text: inlineError
        }
      }

      res.render('email/get-updated', pageObject);

    } else {

      res.redirect('/email/check-email');

    }

});



module.exports = router;
