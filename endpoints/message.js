
var express = require('express');

var router = express.Router();

var twilio = require('twilio');

router.post('/message_detail_get',authenticated(['ADMIN']),function(req,res){
    db.models.Message.find({date:req.body.date,session:req.body.session}).then((message)=>{
       res.json(message_detail);
       console.log(message_detail);
    })
});


router.post('/message_get_all',authenticated(['ADMIN']),function(req,res){
    db.models.Message.find({session:req.body.session}).then((message)=>{
       res.json(message_detail);
       console.log(message_detail);
    }).catch((err)=>{
    	console.log(err);
    	throw err = new Error('Some error occured');
    })
});

router.post('/message',authenticated(['ADMIN']),function(req,res){

	var message = new db.models.Message({
    
     body: req.body.messagebody,
     to: req.body.to,
     date: req.body.date,
     time: req.body.time,
		 current_session:req.body.session

	});

	message.save().then((message)=>{
		res.json(message);
		console.log(message);
	}).catch((err)=>{
	     console.log(err);
	     throw err = new Error('Some error occured');
	})
});


router.post('/message_get_detail_user',function(req,res){
       db.models.Message.findOne({_id:req.body._id,session:req.body.session}).then((message)=>{
          res.json(message);
          console.log(message);        
       }).catch((err)=>{
       	  console.log(err);
       	  throw err = new Error('Some Error Occured');
       })
});


module.exports = router;

