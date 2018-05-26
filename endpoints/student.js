var express = require('express');
var router = express.Router(); 

router.post('/student_get',authenticated(['ADMIN','LIBRARIAN','ACCOUNTANT']),function(req,res){
	
	db.models.Student.findOne({_id: req.body._id}).then((students)=>{
		console.log(students);
		res.json(students);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});
//
router.post('/student_get_for_erp_id',authenticated(['ADMIN','LIBRARIAN','ACCOUNTANT']),function(req,res){
   if (!req.body.erp_id || !req.body.session){
    res.json('Please enter erpid and session');
   }
   else{
    db.models.Student.findOne({erp_id:req.body.erp_id,session:req.body.session}).then((student)=>{
     if(!student){
      res.json('Invalid erp_id');
     }
     else{
       res.json(student);
     }
   
  }).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching student erp id');
    console.log('Some kind of error occured....')
  })
}
})
//authenticated['ADMIN','LIBRARIAN','ACCOUNTANT'],
router.post('/students_get_for_class_ref',authenticated(['ADMIN','LIBRARIAN','ACCOUNTANT']),function(req,res){
  console.log(count++);
	db.models.Student.find({class_ref:req.body.class_ref,session:req.body.session}).then((student)=>{
		res.json(student);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});
//authenticated(['ADMIN'])
router.post('/student',authenticated(['ADMIN']),function(req,res,next){

    console.log("idhar aya");
 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Student.findOne({user_id:user._id}).then((student)=>{
      if(student){
    
      student.name = req.body.name;
      student.student_contact=  req.body.student_contact;
      student.parent_contact =  req.body.parent_contact;
      student.gender =  req.body.gender;
      student.address = req.body.address;
      student.birthday = req.body.birthday;
      student.email = req.body.email;
      student.class_ref =  req.body.class_ref;
      student.dormitory = req.body.dormitory;
      student.transport = req.body.transport;
      student.date_of_join = req.body.date_of_join;
      student.aadhar_num = req.body.aadhar_num;
      student.account_name = req.body.account_name;
      student.account_number = req.body.account_number;
      student.ifsc = req.body.ifsc;
      student.caste = req.body.caste;
      student.session = req.body.session;
      student.save().then((editedStudent)=>{
      res.json(editedStudent);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing student'); 
    })
  }

   else{
     res.json('Username alreay exists....')
   }
 }).catch((err)=>{
    console.log(err);
 })
}
else{
     console.log(req.body);
  var user =  new db.models.User({
    username: req.body.username,
    password: req.body.password,
    type: 'STUDENT'

  });

  user.save()
  .then((student)=>{
    console.log(student);


 db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'ST' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newStudent = new db.models.Student({
      user_id: student._id,
      name: req.body.name,
      erp_id: erp_id,
      student_contact: req.body.student_contact,
      parent_contact: req.body.parent_contact,
      gender: req.body.gender,
      address: req.body.address,
      birthday: req.body.birthday,
      email: req.body.email,
      class_ref: req.body.class_ref,
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
    newStudent.save()
    .then((newStudent)=>{
      console.log(newStudent);
      res.json(newStudent);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new student');
      console.log(err);
    })

    }

    else{

      var counter = new db.models.Count({
         session: req.body.session
      })
      counter.save().then((counter)=>{
        console.log(counter);
        var stringCounter = counter.count.toString().length
        var erp_id = 'ST' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newStudent = new db.models.Student({
        user_id: student._id,
        name: req.body.name,
        erp_id: erp_id,
        student_contact: req.body.student_contact,
        parent_contact: req.body.parent_contact,
        gender: req.body.gender,
        address: req.body.address,
        birthday: req.body.birthday,
        email: req.body.email,
        class_ref: req.body.class_ref,
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
      newStudent.save()
      .then((newStudent)=>{
         res.json(newStudent);
        console.log(newStudent);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new student');
        console.log(err);
      })
       
      }).catch((err)=>{
        console.log(err);
        console.log('Error while fetching counter');
      })
    }
  
 }).catch((err)=>{
   console.log(err);
   console.log('Error while creating counter');
 })

 })
  .catch((err)=>{
    res.json('Error while Saving....');
    console.log(err);
  })

}

 }).catch((err)=>{
  console.log(err);
  throw err= new Error('Error while searching student');
 })
 

});


module.exports = router;
