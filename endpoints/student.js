var express = require('express');
var router = express.Router(); 

router.post('/student_get',authenticated(['ADMIN','LIBRARIAN','ACCOUNTANT']),function(req,res){
	
	db.models.Student.findOne({_id: req.body._id}).then((students)=>{
		console.log(students);
		res.json(students);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured while fetching student using _id");
	})
});

router.post('/student_get_for_user_id',function(req,res){
  
  db.models.Student.findOne({user_id: req.body.user_id,session:req.body.session}).populate('dormitory transport image').then((student)=>{
    console.log(student);
    res.json(student);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching student using user_id");
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
  
	db.models.Student.find({class_ref:req.body.class_ref,session:req.body.session}).populate('dormitory transport image class_ref').then((student)=>{
    console.log(student);
		res.json(student);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});
//authenticated(['ADMIN'])
router.post('/student',authenticated(['ADMIN']),function(req,res,next){
    //console.log(req.file);
    console.log("idhar aya");
 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Student.findOne({user_id:user._id,session:req.body.session}).then((student)=>{
      if(student){
    
      student.name = req.body.name;
      student.student_contact=  req.body.student_contact;
      student.parent_contact =  req.body.parent_contact;
      student.gender =  req.body.gender;
      student.guardian = req.body.guardian;
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
      student.image = req.body.image;
      student.status = req.body.status;
      student.session = req.body.session;
      student.save().then((editedStudent)=>{
      res.json(editedStudent);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing student'); 
    })
  }

   else if(!student && user.type === 'STUDENT'){
      db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'ST' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newStudent = new db.models.Student({
      user_id: user._id,
      name: req.body.name,
      erp_id: erp_id,
      student_contact: req.body.student_contact,
      parent_contact: req.body.parent_contact,
      gender: req.body.gender,
      guardian: req.body.guardian,
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
      status: req.body.status,
      image: req.body.image,
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
        user_id:user._id,
        name: req.body.name,
        erp_id: erp_id,
        student_contact: req.body.student_contact,
        parent_contact: req.body.parent_contact,
        gender: req.body.gender,
        address: req.body.address,
        birthday: req.body.birthday,
        email: req.body.email,
        class_ref: req.body.class_ref,
        guardian: req.body.guardian,
        dormitory: req.body.dormitory,
        transport: req.body.transport,
        date_of_join: req.body.date_of_join,
        aadhar_num: req.body.aadhar_num,
        account_name: req.body.account_name,
        account_number: req.body.account_number,
        ifsc: req.body.ifsc,
        status: req.body.status,
        image: req.body.image,
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

   }

else{
  res.json('Username already exist!!!');
  console.log('Username already exist!!!');
}
 }).catch((err)=>{
    console.log(err);
 })
}
else{
     console.log(req.body);
  var user =  new db.models.User({
    username: req.body.username,
    password: '12345',
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
      guardian: req.body.guardian,
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
      status: req.body.status,
      image: req.body.image,
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
        guardian: req.body.guardian,
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
        status: req.body.status,
        image: req.body.image,
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
  }).catch((err)=>{
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
