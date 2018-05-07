var express = require('express');
var router = express.Router(); 

router.post('/teacher_get',function(req,res){
	
	db.models.Teacher.findOne({_id: req.body._id}).then((teacher)=>{
		console.log(teacher);
		res.json(teacher);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/teacher_get_all',function(req,res){
	db.models.Teacher.find({}).then((teachers)=>{
		res.json(teachers);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/teacher',function(req,res){

  if(!req.body.username) {
   	    throw err = new Error('Please Specify username');
  }

  db.models.User.findOne({username:req.body.username}).then((user)=>{
     if(user){
        db.models.Teacher.findOne({user_id:user._id}).then((teacher)=>{
          if(teacher){
            teacher = {
                user_id: req.body.user_id,
                name: req.body.name,
                erp_id: req.body.erp_id,
                gender: req.body.gender,
                address: req.body.address,
                birthday: req.body.birthday,
                email: req.body.email,
                phone: req.body.phone,
                dormitory: req.body.dormitory,
                transport: req.body.transport,
                date_of_join: req.body.date_of_join,
                aadhar_num: req.body.aadhar_num,
                account_name: req.body.account_name,
                account_number: req.body.account_number,
                ifsc: req.body.ifsc,
                caste: req.body.caste,
                session: req.body.session
              }
                teacher.save().then((editedTeacher)=>{
                  res.json(editedTeacher);
                  console.log(editedTeacher);
                }).catch((err)=>{
                  throw err = new Error("Error while updating");
                  console.log(err);
                })

          }

        else {
          res.json('Username already exists...please try another one...');
        }

        }).catch((err)=>{
          console.log(err);
          if (err) throw err = new Error('Error while finding teacher')
        })
     }

  else{
    
    console.log(req.body);
    var user = new db.models.User({
    username: req.body.username,
    password: req.body.password,
    type: 'TEACHER'

  });

  user.save()
  .then((teacher)=>{
    console.log(teacher);
    //res.json({username:student.username,type:student.type});
    var newTeacher = new db.models.Teacher({
      user_id: teacher._id,
      name: req.body.name,
      erp_id: req.body.erp_id,
      gender: req.body.gender,
      address: req.body.address,
      birthday: req.body.birthday,
      email: req.body.email,
      phone: req.body.phone,
      dormitory: req.body.dormitory,
      transport: req.body.transport,
      date_of_join: req.body.date_of_join,
      aadhar_num: req.body.aadhar_num,
      account_name: req.body.account_name,
      account_number: req.body.account_number,
      ifsc: req.body.ifsc,
      caste: req.body.caste,
      session: req.body.session
    });
    newTeacher.save()
    .then((newTeacher)=>{
      console.log(newTeacher);
      res.json(newTeacher);
    }).catch((err)=>{
      res.json('Error while saving new Teacher');
      console.log(err);
    })
 })
  .catch((err)=>{
    res.json('Error while Saving....');
    console.log(err);
  }) 
  }
  })
 
  
  //
});

module.exports = router;
