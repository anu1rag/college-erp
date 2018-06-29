
var express = require('express');
var router = express.Router(); 

router.post('/admin_get_erp_id',authenticated(['SUPERADMIN']),function(){
  db.models.Admin.findOne({ erp_id: req.body.erp_id,  })
     .then((admin)=>{
       res.json(admin);
     }).catch((err)=>{
       console.log(err);
       res.json('some error occured while fetching erp id');
     })
})

router.post('/admin_get',authenticated(['SUPERADMIN']),function(req,res){
	
	db.models.Admin.findOne({_id: req.body._id}).populate('dormitory transport image').then((admin)=>{
		console.log(admin);
		res.json(admin);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/admin_get_all',authenticated(['SUPERADMIN']),function(req,res){
	db.models.Admin.find({}).populate('dormitory transport image').then((admins)=>{
    console.log(admins);
		res.json(admins);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/admin_get_for_user_id',authenticated(['ADMIN']),function(req,res){
  
  db.models.Admin.findOne({user_id:req.body.user_id,}).populate('dormitory transport image').then((admin)=>{
    console.log(admin);
    res.json(admin);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching admin using user_id");
  })
});

router.post('/admin',authenticated(['SUPERADMIN']),function(req,res,next){
    console.log(req.file);
    console.log("idhar aya");
 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Admin.findOne({user_id:user._id,}).then((admin)=>{
      if(admin){
    
      admin.name = req.body.name;
      admin.phone =  req.body.phone;
      admin.gender =  req.body.gender;
      admin.address = req.body.address;
      admin.admin_contact = req.body.admin_contact;
      admin.alternate_contact = req.body.alternate_contact;
      admin.birthday = req.body.birthday;
      admin.email = req.body.email;
      admin.dormitory = req.body.dormitory;
      admin.transport = req.body.transport;
      admin.date_of_join = req.body.date_of_join;
      admin.aadhar_num = req.body.aadhar_num;
      admin.account_name = req.body.account_name;
      admin.account_number = req.body.account_number;
      admin.ifsc = req.body.ifsc;
      admin.caste = req.body.caste;
      admin.status = req.body.status;
      admin.image = req.body.image;
      admin.session = req.body.session;
      admin.save().then((editedAdmin)=>{
      res.json(editedAdmin);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing admin'); 
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
    type: 'ADMIN'

  });

  user.save()
  .then((admin)=>{
    console.log(admin);

      var newAdmin = new db.models.Admin({
      user_id: admin._id,
      name: req.body.name,
      admin_contact: req.body.admin_contact,
      alternate_contact: req.body.alternate_contact,
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
      
    });
    newAdmin.save()
    .then((newAdmin)=>{
      console.log(newAdmin);
      res.json(newAdmin);
    }).catch((err)=>{
      res.json('Error while saving new admin');
      console.log(err);
    })
  
    

  }).catch((err)=>{
    res.json('Error while Saving....');
    console.log(err);
  })

}

 }).catch((err)=>{
  console.log(err);
  throw err= new Error('Error while searching admin');
 })
 

});

module.exports = router;
