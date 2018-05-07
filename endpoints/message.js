
var express = require('express');

var router = express.Router();

var twilio = require('twilio');

router.post('/message_detail_get',function(req,res){
    db.models.Message_Detail.findOne({_id: req.body._id}).then((message)=>{
       res.json(message_detail);
       console.log(message_detail);
    })
});


router.post('/message_get_all',function(req,res){
    db.models.Message_Detail.find().then((message)=>{
       res.json(message_detail);
       console.log(message_detail);
    }).catch((err)=>{
    	console.log(err);
    	throw err = new Error('Some error occured');
    })
});

router.post('/message_create',function(req,res){
	var message = new db.models.Message({

		time_sent:req.body.time_sent,
		time_seen:req.body.time_seen,
		from:req.body.from,
		to:req.body.to,
		message:req.body.message,
		status:req.body.status
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
       db.models.Message.findOne({_id:req.body._id}).then((message)=>{
          res.json(message);
          console.log(message);        
       }).catch((err)=>{
       	  console.log(err);
       	  throw err = new Error('Some Error Occured');
       })
});


// router.post('/message_post_detail_user_received',function(req,res){
// 	db.models.Message.find({user_id:req.body.user_id}).then((message)=>{
// 		if(message.length == 0){
//            var message = new db.models.Message({
//            	    user_id: req.body.user_id,
//            	    inbox: req.body.
//            })
// 		}
// 	})
// });

module.exports = router;

