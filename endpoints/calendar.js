var express = require('express');
var router = express.Router(); 

router.post('/calendar_get_one',authenticated(['ADMIN','LIBRARIAN','ACCOUNTANT','TEACHER','OTHER']),function(req,res){
	
	db.models.Calendar.findOne({date:req.body.date,session:req.body.session}).then((calendar)=>{
		console.log(calendar);
		res.json(calendar);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/calendar_get_all',authenticated(['ADMIN','LIBRARIAN','ACCOUNTANT','TEACHER','OTHER']),function(req,res){
	db.models.Calendar.find({session:req.body.session}).then((calendars)=>{
		console.log(calendars);
		res.json(calendars);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})


router.post('/calendar',authenticated(['ADMIN']),function(req,res){
	
	var calendar = new db.models.Calendar({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		type :req.body.type,
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


router.post('/calendar_edit',authenticated(['ADMIN']),function(req,res){
	db.models.Calendar.findOne({_id:req.body._id}).then((calendarEdited)=>{
       
    if(calendarEdited){
       	calendarEdited.title= req.body.title;
		calendarEdited.start= req.body.start;
		calendarEdited.end= req.body.end;
		calendarEdited.type=req.body.type;
		calendarEdited.session= req.body.session;
		calendarEdited.save().then((calendarSaved)=>{
            res.json(calendarSaved);
		}).catch((err)=>{
			console.log(err);
			throw err = new Error('Error while editing calendar event');
		})
     }

    else {
       	var calendar = new db.models.Calendar({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		type :req.body.type,
		session: req.body.session
	});

	calendar.save().then((newcalendar)=>{
		res.json(newcalendar);
		console.log(newcalendar);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});

   }


		

	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while finding event');
});
});

module.exports = router;