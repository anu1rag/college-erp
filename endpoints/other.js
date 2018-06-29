var express = require('express');
var router = express.Router(); 

router.post('/other_get',authenticated(['ADMIN','OTHER']),function(req,res){
	
	db.models.OtherStaff.findOne({erp_id: req.body.erp_id,session:req.body.session}).populate('dormitory transport image').then((otherstaff)=>{
		console.log(otherstaff);
		res.json(otherstaff);
	}).catch((err)=>{
		console.log(err);
		res.json("some error occured")
	})
});

router.post('/other_get_all',authenticated(['ADMIN']),function(req,res){
	db.models.OtherStaff.find({session:req.body.session}).populate('dormitory transport image').then((otherstaffs)=>{
		res.json(otherstaffs);
	}).catch((err)=>{
		console.log('Some kind of error occured....')
	})
});


router.post('/other_get_for_user_id',authenticated(['OTHER']),function(req,res){
  
  db.models.OtherStaff.findOne({user_id: req.body.user_id,session: req.body.session}).populate('dormitory transport image').then((other)=>{
    console.log(other);
    res.json(other);
  }).catch((err)=>{
    console.log(err);
    res.json("some error occured while fetching other using user_id");
  })
});

router.post('/other',authenticated(['ADMIN']),function(req,res,next){
    console.log(req.file);
    console.log("idhar aya");
 db.models.User.findOne({username:req.body.username}).then((user)=>{
  if(user){
     db.models.Other.findOne({user_id:user._id,session:req.body.session}).then((other)=>{
      if(other){
    
      other.name = req.body.name;
      other.phone =  req.body.phone;
      other.gender =  req.body.gender;
      other.address = req.body.address;
      other.birthday = req.body.birthday;
      other.email = req.body.email;
      other.class_ref =  req.body.class_ref;
      other.dormitory = req.body.dormitory;
      other.transport = req.body.transport;
      other.date_of_join = req.body.date_of_join;
      other.aadhar_num = req.body.aadhar_num;
      other.account_name = req.body.account_name;
      other.account_number = req.body.account_number;
      other.ifsc = req.body.ifsc;
      other.caste = req.body.caste;
      other.status = req.body.status,
      other.image = req.body.image;
      other.session = req.body.session;
      other.save().then((editedOther)=>{
      res.json(editedOther);

    }).catch((err)=>{
      console.log(err);
      throw (err) = new Error('Error while editing other'); 
    })
  }

   else if(!other && user.type === 'OTHER'){
      db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'Os' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newOther = new db.models.Other({
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
    newOther.save()
    .then((newOther)=>{
      console.log(newOther);
      res.json(newOther);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new other');
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
        var erp_id = 'Os' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newOther = new db.models.Other({
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
      newOther.save()
      .then((newOther)=>{
         res.json(newOther);
        console.log(newOther);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new other');
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
  
  var user =  new db.models.User({
    username: req.body.username,
    password: '12345',
    type: 'OTHER'

  });

  user.save()
  .then((other)=>{
    console.log(other); 


 db.models.Count.findOne({session:req.body.session}).then((counter)=>{
    console.log(Boolean(counter))
    if(counter){
      var stringCounter = counter.count.toString().length;
      var erp_id = 'Os' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
      console.log("erp",erp_id);
      var newOther = new db.models.Other({
      user_id: other._id,
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
    newOther.save()
    .then((newOther)=>{
      console.log(newOther);
      res.json(newOther);
      counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
    }).catch((err)=>{
      res.json('Error while saving new other');
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
        var erp_id = 'Os' + '0'.repeat(counter.str.length - stringCounter) + (++counter.count);
        var newOther = new db.models.Other({
        user_id: other._id,
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
      newOther.save()
      .then((newOther)=>{
         res.json(newOther);
        console.log(newOther);


        counter.save().then((counter)=>{
          console.log('updated counter',counter)
        }).catch((err)=>{
           console.log(err);
           console.log('Err while updating counter');
        })
        
      }).catch((err)=>{
        res.json('Error while saving new other');
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
  throw err= new Error('Error while searching other');
 })
 

});


module.exports = router;
