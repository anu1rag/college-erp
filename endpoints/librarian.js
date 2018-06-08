var express = require('express');
var router = express.Router(); 

router.post('/librarian_get',authenticated(['ADMIN','ACCOUNTANT','LIBRARIAN']),function(req,res){
	
	db.models.Librarian.findOne({erp_id: req.body.erp_id,session: req.body.session}).then((librarian)=>{
		console.log(librarian);
		res.json(librarian);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

//maja aa rha hai naa saale

router.post('/librarian_get_all',authenticated(['ADMIN','ACCOUNTANT','LIBRARIAN']),function(req,res){
	db.models.Librarian.find({session:req.body.session}).then((librarians)=>{
		res.json(librarians);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});


router.post('/librarian_get_for_user_id',authenticated(['LIBRARIAN']),function(req,res){
  
  db.models.Librarian.findOne({user_id: req.body.user_id}).then((librarian)=>{
    console.log(librarian);
    res.json(librarian);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching librarian using user_id");
  })
});

router.post('/librarian',authenticated(['ADMIN']),function(req,res,next){


 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Librarian.findOne({user_id:user._id,session:req.body.session}).then((librarian)=>{
      if(librarian){
    
      librarian.name = req.body.name;
      librarian.phone=  req.body.phone;
      librarian.gender =  req.body.gender;
      librarian.address = req.body.address;
      librarian.birthday = req.body.birthday;
      librarian.email = req.body.email;
      librarian.dormitory = req.body.dormitory;
      librarian.transport = req.body.transport;
      librarian.date_of_join = req.body.date_of_join;
      librarian.aadhar_num = req.body.aadhar_num;
      librarian.account_name = req.body.account_name;
      librarian.account_number = req.body.account_number;
      librarian.ifsc = req.body.ifsc;
      librarian.caste = req.body.caste;
      librarian.session = req.body.session;
      librarian.save().then((editedlibrarian)=>{
      res.json(editedlibrarian);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing librarian'); 
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
    type: 'LIBRARIAN'

  });

  user.save()
  .then((librarian)=>{
    console.log(librarian);


 db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'LI' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newlibrarian = new db.models.Librarian({
      user_id: librarian._id,
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
    newlibrarian.save()
    .then((newlibrarian)=>{
      console.log(newlibrarian);
      res.json(newlibrarian);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new librarian');
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
        var erp_id = 'LI' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newlibrarian = new db.models.Librarian({
        user_id: librarian._id,
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
      newlibrarian.save()
      .then((newlibrarian)=>{
         res.json(newlibrarian);
        console.log(newlibrarian);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new librarian');
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
  throw err= new Error('Error while searching librarian');
 })
 

});

module.exports = router;
