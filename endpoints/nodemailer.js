
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/configure_nodemailer',authenticated(['ADMIN']),function(req,res){
  var nodemailer_data = new db.models.Nodemailer({
  	   mail: req.body.mail,
  	   client_id: req.body.client_id,
  	   client_secret: req.body.client_secret,
  	   refresh_token: req.body.refresh_token
  });

  nodemailer_data.save().then((nodemailer_data)=>{
  	res.json(nodemailer_data);
  	console.log(nodemailer_data);
  }).catch((err)=>{
  	console.log(err);
    throw err = new Error('Some error occured');
  })
})


router.post('/edit_nodemailer',authenticated(['ADMIN']),function(req,res){
	db.models.Nodemailer.findOne({_id: req.body._id}).then((nodemailer_data)=>{
		nodemailer_data = {
			mail: req.body.mail,
  	        client_id: req.body.client_id,
  	        client_secret: req.body.client_secret,
  	        refresh_token: req.body.refresh_token
		}
        nodemailer_data.save().then((nodemailer_saved_data)=>{
       	  res.json(nodemailer_saved_data);
       	  console.log(nodemailer_saved_data);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Some error occured');
       })

	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');

	})
});

router.post('/send_nodemailer',authenticated(['ADMIN']),function(req,res){
	db.models.Nodemailer.findOne({_id: req.body._id}).then((nodemailer_data)=>{
       
        var smtpTransport = nodemailer.createTransport("SMTP", {
	    service: "Gmail",
	    auth: {
	      XOAuth2: {
	        user: nodemailer_data.mail, // Your gmail address.
	        clientId: nodemailer_data.client_id,
	        clientSecret: nodemailer_data.client_secret,
	        refreshToken: nodemailer_data.refresh_token
	      }
	    }
       });
        // Setup mail configuration
		var mailOptions = {
		    from: nodemailer_data.mail, // sender address
		    to: req.body.to.toString(), // list of receivers
		    subject: req.body.subject, // Subject line
		    // text: '', // plaintext body
		    html: req.body.htmlBody // html body
		  };
          // send mail
		  smtpTransport.sendMail(mailOptions, function(error, info) {
		    if (error) {
		       console.log(err);
		       throw err = new Error('Error while sending mail');
		    } else {
		      console.log('Message %s sent: %s', info.messageId, info.response);
		    }
		    smtpTransport.close();
		  });

	

	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some Error occured');
	});
})


module.exports = router;