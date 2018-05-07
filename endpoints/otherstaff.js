var express = require('express');
var router = express.Router(); 

router.post('/otherstaff_get',function(req,res){
	
	db.models.OtherStaff.findOne({_id: req.body._id}).then((otherstaff)=>{
		console.log(otherstaff);
		res.json(otherstaff);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/otherstaff_get_all',function(req,res){
	db.models.OtherStaff.find({}).then((otherstaffs)=>{
		res.json(otherstaffs);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/otherstaff',function(req,res){

  if(!req.body.username) {
   	    throw err = new Error('Please Specify username');
  }

  db.models.User.findOne({username:req.body.username}).then((user)=>{
     if(user){
        db.models.OtherStaff.findOne({user_id:user._id}).then((otherstaff)=>{
          if(otherstaff){
            otherstaff = {
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
                otherstaff.save().then((editedotherstaff)=>{
                  res.json(editedotherstaff);
                  console.log(editedotherstaff);
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
          if (err) throw err = new Error('Error while finding otherstaff')
        })
     }

  else{
    
    console.log(req.body);
    var user = new db.models.User({
    username: req.body.username,
    password: req.body.password,
    type: 'OTHERSTAFF'

  });

  user.save()
  .then((otherstaff)=>{
    console.log(otherstaff);
    //res.json({username:student.username,type:student.type});
    var newotherstaff = new db.models.OtherStaff({
      user_id: otherstaff._id,
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
    newotherstaff.save()
    .then((newotherstaff)=>{
      console.log(newotherstaff);
      res.json(newotherstaff);
    }).catch((err)=>{
      res.json('Error while saving new otherstaff');
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
