
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
	
	db.models.Marks.findOne({exam_ref:req.body.exam_ref,session:req.body.session}).populate('exam_ref students.student').then((marks)=>{
		console.log("marks get for exam ref:",marks);
		res.json(marks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});


router.post('/marks_get_for_student_ref',authenticated(['STUDENT']),function(req,res){
	
	db.models.Marks.find({class_ref:req.body.class_ref,session:req.body.session}).populate('exam_ref students.student subject_ref').then((marks)=>{
		console.log(marks);
         if(marks){
    

         	var mark_len = marks.length;
			var mark_student = [];
			for(var i=0;i<mark_len;i++){

				for(j=0;j<marks[i].students.length;j++){
				 if(marks[i].students[j]['student']['_id'] == req.body.student_id){
	                 mark_student.push({date:marks[i]['exam_ref']['date'],marks:marks[i].students[j]['marks'],subject:marks[i]['subject_ref']['name'],total_marks:marks[i]['exam_ref']['total_marks'],name:marks[i]['exam_ref']['name']})             
				  }

				}

			}

			res.json(mark_student);			
     }

	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/marks_get_all',authenticated(['ADMIN','TEACHER','STUDENT']),function(req,res){
	
	db.models.Marks.find({class_ref:req.body.class_ref,session:req.body.session}).populate('students.student').then((marks)=>{
		console.log(marks);
		res.json(marks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/marks',authenticated(['ADMIN','TEACHER','STUDENT']),function(req,res){
	
   db.models.Marks.findOne({exam_ref:req.body.exam_ref,class_ref:req.body.class_ref,session:req.body.session}).then((marks=>{
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
     	class_ref: req.body.class_ref,
        exam_ref: req.body.exam_ref,
        subject_ref: req.body.subject_ref,
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