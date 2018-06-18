var express = require('express');
var router = express.Router(); 

router.post('/other_get',authenticated(['ADMIN','OTHER']),function(req,res){
	
	db.models.OtherStaff.findOne({erp_id: req.body.erp_id,session:req.body.session}).then((otherstaff)=>{
		console.log(otherstaff);
		res.json(otherstaff);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/other_get_all',authenticated(['ADMIN']),function(req,res){
	db.models.OtherStaff.find({session:req.body.session}).then((otherstaffs)=>{
		res.json(otherstaffs);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});


router.post('/other_get_for_user_id',authenticated(['OTHER']),function(req,res){
  
  db.models.OtherStaff.findOne({user_id: req.body.user_id,session: req.body.session}).then((other)=>{
    console.log(other);
    res.json(other);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching teacher using user_id");
  })
});

router.post('/other',authenticated(['ADMIN']),function(req,res,next){


 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.OtherStaff.findOne({user_id:user._id}).then((otherstaff)=>{
      if(otherstaff){
    
      otherstaff.name = req.body.name;
      otherstaff.phone=  req.body.phone;
      otherstaff.gender =  req.body.gender;
      otherstaff.address = req.body.address;
      otherstaff.birthday = req.body.birthday;
      otherstaff.email = req.body.email;
      otherstaff.dormitory = req.body.dormitory;
      otherstaff.transport = req.body.transport;
      otherstaff.date_of_join = req.body.date_of_join;
      otherstaff.aadhar_num = req.body.aadhar_num;
      otherstaff.account_name = req.body.account_name;
      otherstaff.account_number = req.body.account_number;
      otherstaff.ifsc = req.body.ifsc;
      otherstaff.caste = req.body.caste;
      otherstaff.session = req.body.session;
      otherstaff.save().then((editedotherstaff)=>{
      res.json(editedotherstaff);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing otherstaff'); 
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
    type: 'OTHER'

  });

  user.save()
  .then((otherstaff)=>{
    console.log(otherstaff);


 db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'OS' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newotherstaff = new db.models.OtherStaff({
      user_id: otherstaff._id,
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
    newotherstaff.save()
    .then((newotherstaff)=>{
      console.log(newotherstaff);
      res.json(newotherstaff);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new otherstaff');
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
        var erp_id = 'OS' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newotherstaff = new db.models.OtherStaff({
        user_id: otherstaff._id,
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
      newotherstaff.save()
      .then((newotherstaff)=>{
         res.json(newotherstaff);
        console.log(newotherstaff);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new otherstaff');
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
  throw err= new Error('Error while searching otherstaff');
 })
 

});


module.exports = router;
