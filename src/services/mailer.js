'use strict';

// TODO: Change this into environments
const AWS_ACCESS_KEY = 'XXX';
const AWS_ACCESS_SECRET = 'XXX';

const nodeMailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');

var transport = nodeMailer.createTransport(sesTransport({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_ACCESS_SECRET,
  region: 'eu-west-1',
  rateLimit: 5
}));

function send(to_email, subject, message) {

  var mailData = {
    from: 'support@apihog.com',
    to: to_email,
    subject: subject,
    text: message,
    html: message // TODO: Capture html version
  };

  transport.sendMail(mailData, function(err){
    if(err)
      console.log(err);
  });

}

module.exports = {
  send: send
};