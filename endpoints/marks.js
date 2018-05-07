
var express = require('express');
var router = express.Router(); 

router.post('/marks_get',function(req,res){
	
	db.models.Marks.findOne({_id: req.body._id}).then((marks)=>{
		console.log(marks);
		res.json(marks);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});


router.post('/marks',function(req,res){
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
		throw err = new Error('Error occured');

	});

});


// router.post('/marks_edit',function(req,res){
// 	db.models.Marks.find({_id:req.body._id}).then((marksEdited)=>{
//        marksEdited = {
		
// 		title: req.body.title,
// 		description: req.body.description,
// 		date: req.body.date,
// 		status: req.body.status,
// 		session: req.body.session
// 	}
// 	}).catch((err)=>{
// 		console.log(err);

// 		throw err = new Error('Error while editing');

// 	});
// });

module.exports = router;