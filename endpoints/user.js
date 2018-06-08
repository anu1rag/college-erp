
var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/admin',function(req,res,next){
  user = new db.models.User({
  	username: 'anurag4142@gmail.com',
  	password: 'thisisadminpass',
  	type: 'ADMIN' 
  });
  user.save().then((user)=>{
  	console.log(user);
  	res.json(user);
  }).catch((err)=>{
  	 console.log(err);
  	 throw err = new Error('Error while saving user');
  })
})



router.post('/login',function(req,res){
	db.models.User.findOne({username: req.body.username}).then((user)=>{
		if(user){
			console.log(user);
             var verifiedUser =  bcrypt.compareSync(req.body.password, user.password);
             console.log(verifiedUser);
          	if(verifiedUser){
               jwt.sign({ user },'@5bjuitioh45t_#vkiyyilr$%_c',(err,token)=>{
               	 if (err) throw err = new Error('Token not generated correctly');
               	 else{
               	 	res.json({access_token:token, user:user.type, _id:user._id});
               	 }


               }); 
          	}

          	else{
          		res.json('User is not verified');
          	}
          
		}

		else {
			res.json('Missing token');
		}
	});
});

module.exports = router;