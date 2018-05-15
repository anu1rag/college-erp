var express = require('express');
var router = express.Router(); 

router.post('/exam_get',function(req,res){
	
	db.models.Exam.findOne({_id: req.body._id,session:req.body.session}).then((exam)=>{
		console.log(exam);
		res.json(exam);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/exam_get_class',function(req,res){
	db.models.Exam.find({class_ref:req.body.class_ref,session:req.body.session}).populate('subject_ref').then((exams)=>{
		console.log(exams);
		res.json(exams);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})

router.post('/exam_get_all',function(req,res){
	db.models.Exam.find({session:req.body.session}).then((exams)=>{
		console.log(exams);
		res.json(exams);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});


router.post('/exam',function(req,res){
	db.models.Exam.findOne({name:req.body.name,session:req.body.session}).then((exam)=>{
		if(!exam){
			var exam = new db.models.Exam({
            name: req.body.name,
		    class_ref: req.body.class_ref,
			subject_ref: req.body.subject_ref,
			date: req.body.date,
			duration: req.body.duration,
			total_marks: req.body.total_marks,
			session: req.body.session	

	    });

	exam.save().then((newexam)=>{
		res.json(newexam);
		console.log(newexam);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});
	}

	else{
		res.json('exam already exist');
	}
	});
	

});


router.post('/exam_edit',function(req,res){
	db.models.Exam.findOne({_id:req.body._id,session:req.body.session}).then((examEdited)=>{
      if(examEdited){
    
		examEdited.name =  req.body.name;
		examEdited.class_ref =  req.body.class_ref;
		examEdited.subject_ref =  req.body.subject_ref;
		examEdited.date =  req.body.date;
		examEdited.duration =  req.body.duration;
		examEdited.total_marks =  req.body.total_marks;
		examEdited.session = req.body.session;
 
    examEdited.save().then((editedexam)=>{
    	res.json(editedexam);
    }).catch((err)=>{

    	throw err = new Error('Error while editing exam');
    });
    }

    else{
    	res.json('No exam with given id');
    }
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});

});


module.exports = router;