var express = require('express');
var router = express.Router(); 

router.post('/accountant_get',function(req,res){
	
	db.models.Accountant.findOne({_id: req.body._id}).then((accountant)=>{
		console.log(accountant);
		res.json(accountant);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

//maja aa rha hai naa saale

router.post('/accountant_get_all',function(req,res){
	db.models.Accountant.find({}).then((accountants)=>{
		res.json(accountants);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/accountant',function(req,res){

  if(!req.body.username) {
        throw err = new Error('Please Specify username');
  }

  db.models.User.findOne({username:req.body.username}).then((user)=>{
     if(user){
        db.models.Accountant.findOne({user_id:user._id}).then((accountant)=>{
          if(accountant){
            accountant = {
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
                accountant.save().then((editedaccountant)=>{
                  res.json(editedaccountant);
                  console.log(editedaccountant);
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
          if (err) throw err = new Error('Error while finding accountant')
        })
     }

  else{
    
    console.log(req.body);
    var user = new db.models.User({
    username: req.body.username,
    password: req.body.password,
    type: 'ACCOUNTANT'

  });

  user.save()
  .then((accountant)=>{
    console.log(accountant);
    //res.json({username:student.username,type:student.type});
    var newaccountant = new db.models.Accountant({
      user_id: accountant._id,
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
    newaccountant.save()
    .then((newaccountant)=>{
      console.log(newaccountant);
      res.json(newaccountant);
    }).catch((err)=>{
      res.json('Error while saving new accountant');
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
