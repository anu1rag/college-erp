

var express = require('express');
var router = express.Router();

router.post('/get_fees_one',authenticated(['ADMIN']),function(req,res){
   db.models.Fees.findOne({_id: req.body._id}).populate('class_ref students.student').then((feesget)=>{
     res.json(feesget);
     console.log(feesget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});

router.post('/get_fees_for_class_ref',authenticated(['ADMIN']),function(req,res){
	db.models.Fees.find({class_ref:req.body.class_ref,session:req.body.session}).populate('class_ref students.student').then((feesname)=>{
		res.json(feesname);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while saving fees');
	})
})



router.post('/fees_create',authenticated(['ADMIN']),function(req,res){
	var feesnew = new db.models.Fees({
      date: req.body.date,
      class_ref: req.body.class_ref,
      students: req.body.students,
      fees: req.body.fees,
      session: req.body.session
	});

	feesnew.save().then((feesnew)=>{
		res.json(feesnew);
		console.log(feesnew);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});

router.post('/fees_edit',authenticated(['ADMIN']),function(req,res){
   db.models.Fees.findOne({_id: req.body._id}).then((getfee)=>{
   	console.log(getfee);
   	var students = getfee.students;
   	var studentIndex = [];
   	if(getfee){
   	  _.each(students,(student,index)=>{
   	  	if(student.student == req.body.student_id){
   	  		console.log(student.student == req.body.student_id);
   	  		studentIndex.push(index);
   	  	}
   	  })
   	  	console.log('studentIndex:',studentIndex);
       getfee.students[studentIndex[0]]['status'] = req.body.status;
       getfee.save().then((savedgetfee)=>{
          console.log(savedgetfee);

          res.json(savedgetfee);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing fee');
       })

   	  }
   	}).catch((err)=>{
   		console.log(err);
   			throw err = new Error('Error while fetching fee for editing');
   	})
})

router.post('/fees_remove',authenticated(['ADMIN']),function(req,res){
  db.models.Fees.findOne({_id:req.body._id}).then((getfee)=>{
	console.log(getfee);
	var students = getfee.students;
   	var studentIndex = [];
   	if(getfee){
   	  _.each(students,(student,index)=>{
   	  	if(student.student == req.body.student_id){
   	  		console.log(student.student == req.body.student_id);
   	  		studentIndex.push(index);
   	  	}
   	  })
   	  	console.log('studentIndex:',studentIndex);
   	  	getfee.students.splice(studentIndex[0],1);
   	  	getfee.save().then((savedgetfee)=>{
          console.log(savedgetfee);

          res.json(savedgetfee);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing fee');
       })
	}
    }).catch((err)=>{
   		console.log(err);
     	throw err = new Error('Error while fetching fee for editing');

})
});
module.exports = router;