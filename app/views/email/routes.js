// Core dependencies
const path = require('path');


// NPM dependencies
const express    = require('express');
const router     = express.Router();
const dotenv     = require('dotenv');
const Email      = require('email-templates');


const { check, validationResult } = require('express-validator');


// Run before other code to make sure variables from .env are available
dotenv.config();


// Email templates
const templateConfirm = path.join(__dirname, '../templates/confirm/');
const templateSubscribed = path.join(__dirname, '../templates/subscribed/');


const email = new Email({
  message: {
    from: 'gov.uk.email@notifications.service.gov.uk'
  },
  locals: {
    name: 'GOV.UK Email'
  },
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  },
  views: {
    options: {
      extension: 'njk'
    }
  },
  send: true,
  preview: false
});


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

      if (req.session.data['confirm'] != 1) {

        // Store in a session (send email once)
        req.session.data['confirm'] = 1;

        // Send email script
        email.send({
          template: templateConfirm,
          message: {
            to: 'gov.uk.doubleoptin@gmail.com'
          }
        });

      }

      res.redirect('/email/check-email');

    }

});



// You’ve subscribed
router.get('/email/subscribed/:id', function(req, res) {

  var id = req.params.id;

  if (id === '1' && req.session.data['subscribed'] != 1) {

    // Store in a session (send email once)
    req.session.data['subscribed'] = 1;

    // Send email script
    email.send({
      template: templateSubscribed,
      message: {
        to: 'gov.uk.doubleoptin@gmail.com'
      }
    });

  }

  res.render('email/subscribed');

});


module.exports = router;
