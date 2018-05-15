var express = require('express');
var router = express.Router(); 

router.post('/calendar_get_one',function(req,res){
	
	db.models.Calendar.findOne({date:req.body.date,session:req.body.session}).then((calendar)=>{
		console.log(calendar);
		res.json(calendar);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/calendar_get_all',function(req,res){
	db.models.Calendar.find({session:req.body.session}).then((calendars)=>{
		console.log(calendars);
		res.json(calendars);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})


router.post('/calendar',function(req,res){
	
	var calendar = new db.models.Calendar({
		date: req.body.date,
		description: req.body.description,
		title: req.body.title,
		session: req.body.session
	});

	calendar.save().then((newcalendar)=>{
		res.json(newcalendar);
		console.log(newcalendar);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});

});


router.post('/calendar_edit',function(req,res){
	db.models.Calendar.find({_id:req.body._id,session:req.body.session}).then((calendarEdited)=>{
       calendarEdited = ({
		date: req.body.date,
		description: req.body.description,
		title: req.body.title,
		session: req.body.session
	})
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});
});

module.exports = router;