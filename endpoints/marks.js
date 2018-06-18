
var express = require('express');
var router = express.Router(); 

router.post('/marks_get_one',authenticated(['ADMIN','TEACHER','STUDENT']),function(req,res){
	
	db.models.Marks.findOne({_id: req.body._id,session:req.body.session}).populate('students.student').then((marks)=>{
		console.log(marks);
		res.json(marks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/marks_get_for_exam_ref',authenticated(['ADMIN','TEACHER','STUDENT']),function(req,res){
	
	db.models.Marks.findOne({exam_ref:req.body.exam_ref,session:req.body.session}).populate('students.student').then((marks)=>{
		console.log(marks);
		res.json(marks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/marks_get_all',authenticated(['ADMIN','TEACHER','STUDENT']),function(req,res){
	
	db.models.Marks.find({session:req.body.session}).populate('students.student').then((marks)=>{
		console.log(marks);
		res.json(marks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/marks',authenticated(['ADMIN','TEACHER','STUDENT']),function(req,res){
	
   db.models.Marks.findOne({exam_ref:req.body.exam_ref,session:req.body.session}).then((marks=>{
   	if(marks){
   		marks.students = req.body.students,
   		marks.save().then((newmarks)=>{
			res.json(newmarks);
			console.log(newmarks);
		}).catch((err)=>{
			console.log(err);
			throw err = new Error('Error occured while editing marks');

		});

    }

    else{
     var marks = new db.models.Marks({
        exam_ref: req.body.exam_ref,
	    students: req.body.students,
	    session: req.body.session
        
	});

	marks.save().then((newmarks)=>{
		res.json(newmarks);
		console.log(newmarks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured while editing marks');

	});
    }
   }))

	

});


module.exports = router;