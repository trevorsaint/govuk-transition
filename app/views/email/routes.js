// https://blog.mailtrap.io/sending-emails-with-nodemailer
// https://blog.stvmlbrn.com/2018/09/06/send-html-email-in-node.html
// https://www.mycodingblog.com/post/node-email-templates


// Core dependencies
const path = require('path');


// NPM dependencies
const express    = require('express');
const router     = express.Router();
const nodemailer = require('nodemailer');
const Email      = require('email-templates');

const { check, validationResult } = require('express-validator');


// Email templates
const templateConfirm    = path.join(__dirname, '../emails/confirm/');
const templateSubscribed = path.join(__dirname, '../emails/subscribed/');


// Nodemailer
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
 });


// Email configurations
const email = new Email({
  treansport: transport,
  send: true,
  preview: false,
  views: {
    root: path.resolve('emails'),
    options: {
      extension: 'njk',
      map: {
        njk: 'nunjucks'
      }
    }
  }
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

      // Send email
      email.send({
        template: templateSubscribed,
        message: {
          from: 'gov.uk.email@notifications.service.gov.uk',
          to: 'gov.uk.doubleoptin@gmail.com'
        }
      })
      .catch(console.error);

      res.redirect('/email/check-email');

    }

});


module.exports = router;
