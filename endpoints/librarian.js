var express = require('express');
var router = express.Router(); 

router.post('/librarian_get',function(req,res){
	
	db.models.Librarian.findOne({_id: req.body._id}).then((librarian)=>{
		console.log(librarian);
		res.json(librarian);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

//maja aa rha hai naa saale

router.post('/librarian_get_all',function(req,res){
	db.models.Librarian.find({}).then((librarians)=>{
		res.json(librarians);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});

router.post('/librarian',function(req,res){

  if(!req.body.username) {
        throw err = new Error('Please Specify username');
  }

  db.models.User.findOne({username:req.body.username}).then((user)=>{
     if(user){
        db.models.Librarian.findOne({user_id:user._id}).then((librarian)=>{
          if(librarian){
            librarian = {
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
                librarian.save().then((editedlibrarian)=>{
                  res.json(editedlibrarian);
                  console.log(editedlibrarian);
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
          if (err) throw err = new Error('Error while finding librarian')
        })
     }

  else{
    
    console.log(req.body);
    var user = new db.models.User({
    username: req.body.username,
    password: req.body.password,
    type: 'librarian'

  });

  user.save()
  .then((librarian)=>{
    console.log(librarian);
    //res.json({username:student.username,type:student.type});
    var newlibrarian = new db.models.Librarian({
      user_id: librarian._id,
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
    newlibrarian.save()
    .then((newlibrarian)=>{
      console.log(newlibrarian);
      res.json(newlibrarian);
    }).catch((err)=>{
      res.json('Error while saving new librarian');
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
