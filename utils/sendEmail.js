'use strict';
const sgridMail = require('sendgrid')(process.env.SENDGRID_API_KEY);

const sendEmailBySendgrid = (to, options, template, optionalData) => {
  var nodemailer = require('nodemailer');
  var hbs = require('nodemailer-express-handlebars');
  var optionsData = {
    viewEngine: {
      extname: '.html',
      layoutsDir: 'lib/templates/',
      defaultLayout: template,
      partialsDir: 'lib/templates/'
    },
    viewPath: 'lib/templates/',
    extName: '.html'
  };

  var sgTransport = require('nodemailer-sendgrid-transport');
  //using sendgrid as transport, but can use any transport.
  var send_grid = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  var mailer = nodemailer.createTransport(sgTransport(send_grid));
  mailer.use('compile', hbs(optionsData));
  mailer.sendMail(
    {
      from: process.env.SENDGRID_FROM,
      to: to.email,
      subject: options.subject || 'Email from Journal',
      template: template,
      context: {
        name: to.firstName,
        options: options,
        optionalData: optionalData,
        mailSettings: {
          logoUrl: `${process.env.BASE_URL}/${process.env.EMAIL_SETTINGS_LOGO}`,
          signatureDetails: process.env.EMAIL_SETTINGS_SIGNATURE_DETAILS,
          footer: process.env.EMAIL_SETTINGS_FOOTER
        }
      }
    },
    function (error, response) {
      if (error) {
        console.log(`Error in sending email to ${to.email}`, error);
      } else {
        console.log(`Mail sent to ${to.email}!`);
      }
      mailer.close();
    }
  );
};

exports.sendEmail = (to, options, template, optionalData) => {
  return sendEmailBySendgrid(to, options, template, optionalData);
};
