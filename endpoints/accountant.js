var express = require('express');
var router = express.Router(); 

router.post('/accountant_get',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	
	db.models.Accountant.findOne({_id: req.body._id,session:req.body.session}).then((accountant)=>{
		console.log(accountant);
		res.json(accountant);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

//maja aa rha hai naa saale

router.post('/accountant_get_all',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Accountant.find({session:req.body.session}).then((accountants)=>{
    console.log(accountants);
		res.json(accountants);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});


router.post('/accountant',authenticated(['ADMIN']),function(req,res,next){


 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Accountant.findOne({user_id:user._id}).then((accountant)=>{
      if(accountant){
    
      accountant.name = req.body.name;
      accountant.phone=  req.body.phone;
      accountant.gender =  req.body.gender;
      accountant.address = req.body.address;
      accountant.birthday = req.body.birthday;
      accountant.email = req.body.email;
      accountant.dormitory = req.body.dormitory;
      accountant.transport = req.body.transport;
      accountant.date_of_join = req.body.date_of_join;
      accountant.aadhar_num = req.body.aadhar_num;
      accountant.account_name = req.body.account_name;
      accountant.account_number = req.body.account_number;
      accountant.ifsc = req.body.ifsc;
      accountant.caste = req.body.caste;
      accountant.session = req.body.session;
      accountant.save().then((editedaccountant)=>{
      res.json(editedaccountant);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing accountant'); 
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
      var newaccountant = new db.models.Accountant({
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
      caste: req.body.caste,
      session: req.body.session
    });
    newaccountant.save()
    .then((newaccountant)=>{
      console.log(newaccountant);
      res.json(newaccountant);
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
        var newaccountant = new db.models.Accountant({
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
        caste: req.body.caste,
        session: req.body.session
      });
      newaccountant.save()
      .then((newaccountant)=>{
         res.json(newaccountant);
        console.log(newaccountant);


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

 })
  .catch((err)=>{
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
