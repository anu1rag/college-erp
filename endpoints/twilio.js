
var express = require('express');
var router = express.Router();
var twilio = require('twilio');

router.post('/configure_twilio',function(req,res){
	
	var twilio_data = new db.models.Twilio({
          account_sid: req.body.account_sid,
          auth_token: req.body.auth_token
      });

	twilio_data.save().then((twilio_data)=>{
		res.json(twilio_data);
		console.log(twilio_data);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});


router.post('/edit_twilio',function(req,res){
    db.models.findOne({_id: req.body._id}).then((twilio_data)=>{
    	twilio_data = {
    		account_sid: req.body.account_sid,
    		auth_token: req.body.auth_token,
    		contact: req.body.contact
    	}

    	twilio_data.save().then((twilio_data)=>{
    		res.json(twilio_data);
    	}).catch((err)=>{
    		console.log(err);
    		throw err = new Error('Some error occured');
    	})
    })
});


router.post('/send_twilio',function(req,res){
	db.models.Twilio.findOne({_id: req.body._id}).then((twilio_data)=>{
		var client = new twilio(twilio_data.account_sid,twilio_data.auth_token);
        client.messages.create({
        	body: req.body.message,
        	to: req.body.to,
        	from: twilio_data.contact

        }).then((message)=>{
        	console.log(message);
        	res.json('Message sent successfully');
        }).catch((err)=>{
        	console.log(err);
        	throw err = new Error('Message was not sent successfully');
        });


	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});

module.exports = router;