var express = require('express');
var router = express.Router(); 

router.post('/accountant_get',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	
	db.models.Accountant.findOne({_id: req.body._id,session:req.body.session}).populate('dormitory transport image').then((accountant)=>{
		console.log(accountant);
		res.json(accountant);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});



router.post('/accountant_get_all',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Accountant.find({session:req.body.session}).populate('dormitory transport image').then((accountants)=>{
    console.log(accountants);
		res.json(accountants);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/accountant_get_for_user_id',authenticated(['ACCOUNTANT']),function(req,res){
  
  db.models.Accountant.findOne({user_id: req.body.user_id,session: req.body.session}).populate('dormitory transport image').then((accountant)=>{
    console.log(accountant);
    res.json(accountant);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching accountant using user_id");
  })
});


router.post('/accountant',authenticated(['ADMIN']),function(req,res,next){
    console.log(req.file);
    console.log("idhar aya");
 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Accountant.findOne({user_id:user._id,session:req.body.session}).then((accountant)=>{
      if(accountant){
    
      accountant.name = req.body.name;
      accountant.phone =  req.body.phone;
      accountant.gender =  req.body.gender;
      accountant.address = req.body.address;
      accountant.birthday = req.body.birthday;
      accountant.email = req.body.email;
      accountant.class_ref =  req.body.class_ref;
      accountant.dormitory = req.body.dormitory;
      accountant.transport = req.body.transport;
      accountant.date_of_join = req.body.date_of_join;
      accountant.aadhar_num = req.body.aadhar_num;
      accountant.account_name = req.body.account_name;
      accountant.account_number = req.body.account_number;
      accountant.status = req.body.status,
      accountant.ifsc = req.body.ifsc;
      accountant.caste = req.body.caste;
      accountant.image = req.body.image;
      accountant.session = req.body.session;
      accountant.save().then((editedAccountant)=>{
      res.json(editedAccountant);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing accountant'); 
    })
  }

   else if(!accountant && user.type === 'ACCOUNTANT'){
      db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'AC' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newAccountant = new db.models.Accountant({
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
      status: req.body.status,
      ifsc: req.body.ifsc,
      image: req.body.image,
      caste: req.body.caste,
      session: req.body.session
    });
    newAccountant.save()
    .then((newAccountant)=>{
      console.log(newAccountant);
      res.json(newAccountant);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new accountant');
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
        var erp_id = 'AC' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newAccountant = new db.models.Accountant({
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
        ifsc: req.body.ifsc,
        status: req.body.status,
        image: req.body.image,
        caste: req.body.caste,
        session: req.body.session
      });
      newAccountant.save()
      .then((newAccountant)=>{
         res.json(newAccountant);
        console.log(newAccountant);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new accountant');
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
    type: 'ACCOUNTANT'

  });

  user.save()
  .then((accountant)=>{
    console.log(accountant);     


 db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'AC' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newAccountant = new db.models.Accountant({
      user_id: accountant._id,
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
      status: req.body.status,
      account_number: req.body.account_number,
      ifsc: req.body.ifsc,
      image: req.body.image,
      caste: req.body.caste,
      session: req.body.session
    });
    newAccountant.save()
    .then((newAccountant)=>{
      console.log(newAccountant);
      res.json(newAccountant);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new accountant');
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
        var erp_id = 'AC' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newAccountant = new db.models.Accountant({
        user_id: accountant._id,
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
      newAccountant.save()
      .then((newAccountant)=>{
         res.json(newAccountant);
        console.log(newAccountant);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new accountant');
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
  throw err= new Error('Error while searching accountant');
 })
 

});


module.exports = router;
