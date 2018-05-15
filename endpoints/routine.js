
var express = require('express');
var router = express.Router(); 

router.post('/routine_get',function(req,res){
	
	db.models.Routine.findOne({_id: req.body._id,session:req.body.session}).then((routine)=>{
		console.log(routine);
		res.json(routine);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/routine_get_class',function(req,res){
    db.models.Routine.find({class_ref: req.body.class_ref,session:req.body.session}).populate('subject_ref').then((routine)=>{
		console.log(routine);
		res.json(routine);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})	
});

router.post('/routine_get_teacher',function(req,res){
	   db.models.Routine.find({teacher_ref: req.body.teacher_ref,session:req.body.session}).populate('class_ref subject_ref').then((routine)=>{
		console.log(routine);
		res.json(routine);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})	
});


router.post('/routine_get_all',function(req,res){
	db.models.Routine.find({session:req.body.session}).populate('subject_ref').then((routines)=>{
		console.log(routines);
		res.json(routines);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})


router.post('/routine',function(req,res){
	console.log(req.body);
	if(!req.body.class_ref || !req.body.teacher_ref || !req.body.subject_ref){
		res.json('Values not found');
	}
	db.models.Routine.findOne({class_ref:req.body.class_ref,
		teacher_ref:req.body.teacher_ref,
		subject_ref:req.body.subject_ref,
	    start_time:req.body.start_time,
	    end_time:req.body.end_time,
	    day:req.body.day,
	    session: req.body.session}).then((routine)=>{
		if(!routine){
		
           var routine = new db.models.Routine({
		    day: req.body.day,
		    start_time: req.body.start_time,
		    end_time: req.body.end_time,
		    subject_ref:  req.body.subject_ref,
		    teacher_ref: req.body.teacher_ref,
		    class_ref: req.body.class_ref,
		    session: req.body.session
	    });

	routine.save().then((newroutine)=>{
		res.json(newroutine);
		console.log(newroutine);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});
	}

	else{
		res.json('routine already exist');
	}
	});
	

});


router.post('/routine_edit',function(req,res){
	db.models.Routine.findOne({_id:req.body._id,session:req.body.session}).then((routineEdited)=>{
      if(routineEdited){
    
		routineEdited.day =  req.body.day;
		routineEdited.start_time =  req.body.start_time;
		routineEdited.end_time =  req.body.end_time;
		routineEdited.subject_ref =  req.body.subject_ref;
		routineEdited.teacher_ref =  req.body.teacher_ref;
		routineEdited.class_ref =  req.body.class_ref;
		routineEdited.session = req.body.session;
 
    routineEdited.save().then((editedroutine)=>{
    	res.json(editedroutine);
    }).catch((err)=>{
        console.log(err);
    	throw err = new Error('Error while editing routine');
    });
    }

    else{
    	res.json('No routine with given id');
    }
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});

});




module.exports = router;