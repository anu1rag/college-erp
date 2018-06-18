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
	
	db.models.Teacher.findOne({_id: req.body._id}).then((teacher)=>{
		console.log(teacher);
		res.json(teacher);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/teacher_get_all',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Teacher.find({session:req.body.session}).then((teachers)=>{
    console.log(teachers);
		res.json(teachers);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/teacher_get_for_user_id',authenticated(['TEACHER']),function(req,res){
  
  db.models.Teacher.findOne({user_id:req.body.user_id,session:req.body.session}).then((teacher)=>{
    console.log(teacher);
    res.json(teacher);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching teacher using user_id");
  })
});

router.post('/teacher',authenticated(['ADMIN','ACCOUNTANT']),function(req,res,next){


 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Teacher.findOne({user_id:user._id}).then((teacher)=>{
      if(teacher){
    
      teacher.name = req.body.name;
      teacher.phone=  req.body.phone;
      teacher.gender =  req.body.gender;
      teacher.address = req.body.address;
      teacher.birthday = req.body.birthday;
      teacher.email = req.body.email;
      teacher.dormitory = req.body.dormitory;
      teacher.transport = req.body.transport;
      teacher.date_of_join = req.body.date_of_join;
      teacher.aadhar_num = req.body.aadhar_num;
      teacher.account_name = req.body.account_name;
      teacher.account_number = req.body.account_number;
      teacher.ifsc = req.body.ifsc;
      teacher.caste = req.body.caste;
      teacher.session = req.body.session;
      teacher.save().then((editedteacher)=>{
      res.json(editedteacher);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing teacher'); 
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
      var newteacher = new db.models.Teacher({
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
      caste: req.body.caste,
      session: req.body.session
    });
    newteacher.save()
    .then((newteacher)=>{
      console.log(newteacher);
      res.json(newteacher);
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
        var newteacher = new db.models.Teacher({
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
        caste: req.body.caste,
        session: req.body.session
      });
      newteacher.save()
      .then((newteacher)=>{
         res.json(newteacher);
        console.log(newteacher);


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

 })
  .catch((err)=>{
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
