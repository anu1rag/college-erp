var express = require('express');
var router = express.Router(); 

router.post('/teacher_get_erp_id',authenticated(['ADMIN','ACCOUNTANT']),function(){
  db.models.Teacher.findOne({ erp_id: req.body.erp_id, session:req.body.session })
     .then((teacher)=>{
       res.json(teacher);
     }).catch((err)=>{
       console.log(err);
       res.json('some error occured while fetching erp id');
     })
})

router.post('/teacher_get',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	
	db.models.Teacher.findOne({_id: req.body._id}).populate('dormitory transport image').then((teacher)=>{
		console.log(teacher);
		res.json(teacher);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/teacher_get_all',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Teacher.find({session:req.body.session}).populate('dormitory transport image').then((teachers)=>{
    console.log(teachers);
		res.json(teachers);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/teacher_get_for_user_id',authenticated(['TEACHER']),function(req,res){
  
  db.models.Teacher.findOne({user_id:req.body.user_id,session:req.body.session}).populate('dormitory transport image').then((teacher)=>{
    console.log(teacher);
    res.json(teacher);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching teacher using user_id");
  })
});

router.post('/teacher',authenticated(['ADMIN']),function(req,res,next){
    //console.log(req.file);
    //console.log("idhar aya");
 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Teacher.findOne({user_id:user._id,session:req.body.session}).then((teacher)=>{
      if(teacher){
    
      teacher.name = req.body.name;
      teacher.phone =  req.body.phone;
      teacher.gender =  req.body.gender;
      teacher.address = req.body.address;
      teacher.birthday = req.body.birthday;
      teacher.email = req.body.email;
      teacher.class_ref =  req.body.class_ref;
      teacher.dormitory = req.body.dormitory;
      teacher.transport = req.body.transport;
      teacher.date_of_join = req.body.date_of_join;
      teacher.aadhar_num = req.body.aadhar_num;
      teacher.account_name = req.body.account_name;
      teacher.account_number = req.body.account_number;
      teacher.ifsc = req.body.ifsc;
      teacher.caste = req.body.caste;
      teacher.image = req.body.image;
      teacher.status = req.body.status;
      teacher.session = req.body.session;
      teacher.save().then((editedTeacher)=>{
      res.json(editedTeacher);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing teacher'); 
    })
  }

   else if(!teacher && user.type === 'TEACHER'){
      db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'TE' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newTeacher = new db.models.Teacher({
      user_id: user._id,
      name: req.body.name,
      erp_id: erp_id,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      birthday: req.body.birthday,
      email: req.body.email,
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
    newTeacher.save()
    .then((newTeacher)=>{
      console.log(newTeacher);
      res.json(newTeacher);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new teacher');
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
        var erp_id = 'TE' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newTeacher = new db.models.Teacher({
        user_id:user._id,
        name: req.body.name,
        erp_id: erp_id,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        birthday: req.body.birthday,
        email: req.body.email,
        dormitory: req.body.dormitory,
        transport: req.body.transport,
        date_of_join: req.body.date_of_join,
        aadhar_num: req.body.aadhar_num,
        account_name: req.body.account_name,
        account_number: req.body.account_number,
        status: req.body.status,
        ifsc: req.body.ifsc,
        image: req.body.image,
        caste: req.body.caste,
        session: req.body.session
      });
      newTeacher.save()
      .then((newTeacher)=>{
         res.json(newTeacher);
        console.log(newTeacher);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new teacher');
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
    type: 'TEACHER'

  });

  user.save()
  .then((teacher)=>{
    console.log(teacher);    


 db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'TE' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newTeacher = new db.models.Teacher({
      user_id: teacher._id,
      name: req.body.name,
      erp_id: erp_id,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      birthday: req.body.birthday,
      email: req.body.email,
      dormitory: req.body.dormitory,
      transport: req.body.transport,
      date_of_join: req.body.date_of_join,
      aadhar_num: req.body.aadhar_num,
      account_name: req.body.account_name,
      account_number: req.body.account_number,
      status: req.body.status,
      ifsc: req.body.ifsc,
      image: req.body.image,
      caste: req.body.caste,
      session: req.body.session
    });
    newTeacher.save()
    .then((newTeacher)=>{
      console.log(newTeacher);
      res.json(newTeacher);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      
      db.models.User.findOne({_id: user._id}).remove().exec().then((userDeleted)=>{
        console.log('Error occcured ,Deleted User successfully')
        res.json('Error while saving new teacher');
      }).catch((err)=>{
        console.log('Cant delete the user');
      })
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
        var erp_id = 'TE' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newTeacher = new db.models.Teacher({
        user_id: teacher._id,
        name: req.body.name,
        erp_id: erp_id,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        birthday: req.body.birthday,
        email: req.body.email,
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
      newTeacher.save()
      .then((newTeacher)=>{
         res.json(newTeacher);
        console.log(newTeacher);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        //res.json('Error while saving new teacher');
           db.models.Users.findOne({_id: teacher._id}).remove().exec().then((userDeleted)=>{
        console.log('Error occcured ,Deleted User successfully')
        res.json('Error occcured ,Deleted User successfully');
      }).catch((err)=>{
        console.log('Cant delete the user');

      })

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
  throw err= new Error('Error while searching teacher');
 })
 

});

module.exports = router;
