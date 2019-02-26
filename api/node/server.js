const express = require('express');

const server = express();

server.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
})

server.get('/sendemail', function(req, res) {
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey('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');

	const msg = {
		to: 'jpark1219dev@gmail.com',
		from: 'visitor@jamesjinpark.com',
    subject: 'received a message at ' + (new Date()).toLocaleString(),
    reply_to: req.query.contactemail,
    text: `
      Email: ${req.query.contactemail}
      Name: ${req.query.contactname}
      Message: ${req.query.contactmessage}
    `,
    html: `
      <div>Email: ${req.query.contactemail}</div>
      <div>Name: ${req.query.contactname}</div>
      <div>Message: ${req.query.contactmessage}</div>
    `
  };
  sgMail.send(msg).then(function(){
    res.send('success');
  });

});

server.listen(4444, function(){
  console.log('Server is running')
})
