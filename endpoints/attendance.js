
var express = require('express');
var router = express.Router();

router.post('/attendance_student_class',function(req,res){
	db.models.Attendance_Student.find({class_ref: req.body.class_ref,session:req.body.session}).then((student_attendance)=>{
		res.json(student_attendance);
		console.log(student_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_student_day',function(req,res){
	db.models.Attendance_Student.findOne({_id:req.body._id,session:req.body.session}).populate('students.student', 'name erp_id parent_contact').then((student_attendance)=>{
		res.json(student_attendance);
		console.log(student_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_student_get_for_class_ref',function(req,res){
	db.models.Attendance_Student.find({date:req.body.date,session:req.body.session, class_ref: req.body.class_ref}).populate('students.student', 'name erp_id parent_contact').then((student_attendance)=>{
		res.json(student_attendance);
		console.log(student_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_teacher_day',function(req,res){
	db.models.Attendance_Accountant.findOne({_id: req.body.id,session:req.body.session}).then((teacher_attendance)=>{
		res.json(teacher_attendance);
		console.log(teacher_attendance);
	})
})

router.post('/attendance_teacher_all',function(req,res){
	db.models.Attendance_Teacher.find({date: req.body.date, session: req.body.session}).populate('staffs.staff', 'name erp_id phone').then((teacher_attendance)=>{
		res.json(teacher_attendance);
		console.log(teacher_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_accountant_day',function(req,res){
	db.models.Attendance_Accountant.findOne({_id: req.body.id,session:req.body.session}).then((accountant_attendance)=>{
		res.json(accountant_attendance);
		console.log(accountant_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_accountant_all',function(req,res){
	db.models.Attendance_Accountant.find({date: req.body.date, session: req.body.session}).populate('staffs.staff', 'name erp_id phone').then((accountant_attendance)=>{
		res.json(accountant_attendance);
		console.log(accountant_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})


router.post('/attendance_librarian_day',function(req,res){
	db.models.Attendance_Librarian.find({_id: req.body.id,session:req.body.session}).then((librarian_attendance)=>{
		res.json(librarian_attendance);
		console.log(librarian_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_librarian_all',function(req,res){
	db.models.Attendance_Librarian.find({date: req.body.date, session: req.body.session}).populate('staffs.staff', 'name erp_id phone').then((librarian_attendance)=>{
		res.json(librarian_attendance);
		console.log(librarian_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})


router.post('/attendance_student',function(req,res){
	db.models.Attendance_Student.findOne({date:req.body.date,session:req.body.session, class_ref: req.body.class_ref})
	.then((student)=>{

	if(student){
		
	   student.class_ref = req.body.class_ref,
	   student.lecture_ref = req.body.lecture_ref,
	   student.date = req.body.date,
	   student.students = req.body.students,
	   student.finalize = req.body.finalize,
	   student.session = req.body.session
	   
	   student.save().then((attendance_student)=>{
	   	 res.json(attendance_student)
	   }).catch((err)=>{
	   	console.log(err);
	   	throw err = new Error('Some error while saving attendance student');
	   })
	}

	else{

      var attendance_student = new db.models.Attendance_Student({
	   class_ref:req.body.class_ref,
	   lecture_ref: req.body.lecture_ref,
	   date: req.body.date,
	   students: req.body.students,
	   finalize:req.body.finalize,
	   session: req.body.session	
	});

	attendance_student.save().then((attendance_student)=>{
     res.json(attendance_student);
     console.log(attendance_student);
	}).catch((err)=>{
		console.log(err);
		throw err = Error('Some error occured');
	})
	}
	}).catch((err)=>{
		console.log(err);

	})
	
})




router.post('/attendance_teacher',function(req,res){
	db.models.Attendance_Teacher.findOne({date:req.body.date,session:req.body.session})
	.then((teacher)=>{

	if(teacher){
		
	   teacher.date = req.body.date,
	   teacher.staffs = req.body.staffs,
	   teacher.finalize = req.body.finalize,
	   teacher.session = req.body.session
	   
	   teacher.save().then((attendance_teacher)=>{
	   	 res.json(attendance_teacher)
	   }).catch((err)=>{
	   	console.log(err);
	   	throw err = new Error('Some error while saving attendance teacher');
	   })
	}

	else{

      var attendance_teacher = new db.models.Attendance_Teacher({
	   date: req.body.date,
	   staffs: req.body.staffs,
	   finalize:req.body.finalize,
	   session: req.body.session	
	});

	attendance_teacher.save().then((attendance_teacher)=>{
     res.json(attendance_teacher);
     console.log(attendance_teacher);
	}).catch((err)=>{
		console.log(err);
		throw err = Error('Some error occured');
	})
	}
	}).catch((err)=>{
		console.log(err);

	})
	
})


router.post('/attendance_accountant',function(req,res){
	db.models.Attendance_Accountant.findOne({date:req.body.date,session:req.body.session})
	.then((accountant)=>{

	if(accountant){
		
	   accountant.date = req.body.date,
	   accountant.staffs = req.body.staffs,
	   accountant.finalize = req.body.finalize,
	   accountant.session = req.body.session
	   
	   accountant.save().then((attendance_accountant)=>{
	   	 res.json(attendance_accountant)
	   }).catch((err)=>{
	   	console.log(err);
	   	throw err = new Error('Some error while saving attendance accountant');
	   })
	}

	else{

      var attendance_accountant = new db.models.Attendance_Accountant({
	   date: req.body.date,
	   staffs: req.body.staffs,
	   finalize:req.body.finalize,
	   session: req.body.session	
	});

	attendance_accountant.save().then((attendance_accountant)=>{
     res.json(attendance_accountant);
     console.log(attendance_accountant);
	}).catch((err)=>{
		console.log(err);
		throw err = Error('Some error occured');
	})
	}
	}).catch((err)=>{
		console.log(err);

	})
	
})

router.post('/attendance_librarian',function(req,res){
	db.models.Attendance_Librarian.findOne({date:req.body.date,session:req.body.session})
	.then((librarian)=>{

	if(librarian){
		
	   librarian.date = req.body.date,
	   librarian.staffs = req.body.staffs,
	   librarian.finalize = req.body.finalize,
	   librarian.session = req.body.session
	   
	   librarian.save().then((attendance_librarian)=>{
	   	 res.json(attendance_librarian)
	   }).catch((err)=>{
	   	console.log(err);
	   	throw err = new Error('Some error while saving attendance librarian');
	   })
	}

	else{

      var attendance_librarian = new db.models.Attendance_Librarian({
	   date: req.body.date,
	   staffs: req.body.staffs,
	   finalize:req.body.finalize,
	   session: req.body.session	
	});

	attendance_librarian.save().then((attendance_librarian)=>{
     res.json(attendance_librarian);
     console.log(attendance_librarian);
	}).catch((err)=>{
		console.log(err);
		throw err = Error('Some error occured');
	})
	}
	}).catch((err)=>{
		console.log(err);

	})
	
})


router.post('/attendance_other',function(req,res){
	db.models.Attendance_Other.findOne({date:req.body.date,session:req.body.session})
	.then((other)=>{

	if(other){
		
	   other.date = req.body.date,
	   other.staffs = req.body.staffs,
	   other.finalize = req.body.finalize,
	   other.session = req.body.session
	   
	   other.save().then((attendance_other)=>{
	   	 res.json(attendance_other)
	   }).catch((err)=>{
	   	console.log(err);
	   	throw err = new Error('Some error while saving attendance other');
	   })
	}

	else{

      var attendance_other = new db.models.Attendance_Other({
	   date: req.body.date,
	   staffs: req.body.staffs,
	   finalize:req.body.finalize,
	   session: req.body.session	
	});

	attendance_other.save().then((attendance_other)=>{
     res.json(attendance_other);
     console.log(attendance_other);
	}).catch((err)=>{
		console.log(err);
		throw err = Error('Some error occured');
	})
	}
	}).catch((err)=>{
		console.log(err);

	})
	
})


router.post('/attendance_other_day',function(req,res){
	db.models.Attendance_Other.find({_id: req.body.id,session:req.body.session}).populate().then((other_attendance)=>{
		res.json(other_attendance);
		console.log(other_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/attendance_other_all',function(req,res){
	db.models.Attendance_Other.find({date: req.body.date, session: req.body.session}).populate('staffs.staff', 'name erp_id phone').then((other_attendance)=>{
		res.json(other_attendance);
		console.log(other_attendance);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})



module.exports = router;