var express = require('express');
var router = express.Router(); 

router.post('/notice_get',function(req,res){
	
	db.models.Notice.findOne({_id: req.body._id}).then((notice)=>{
		console.log(notice);
		res.json(notice);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/notice_get_all',function(req,res){
	db.models.Notice.find().then((notices)=>{
		console.log(notices);
		res.json(notices);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})


router.post('/notice',function(req,res){
	var notice = new db.models.Notice({

		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		status: req.body.status,
		session: req.body.session
	});

	notice.save().then((newnotice)=>{
		res.json(newnotice);
		console.log(newnotice);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});

});


router.post('/notice_edit',function(req,res){
	db.models.Notice.find({_id:req.body._id}).then((noticeEdited)=>{
       noticeEdited = {
		
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		status: req.body.status,
		session: req.body.session
	}
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});
});

module.exports = router;