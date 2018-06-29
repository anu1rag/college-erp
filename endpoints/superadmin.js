
var express= require('express');
var router = express.Router();


router.post('/create',function(req,res){
	db.models.User.findOne({type:'SUPERADMIN'}).then((user)=>{
		if(!user){
		var user = new db.models.User({
			   username :'anurag4141@gmail.com',
			   password :  '@1CollegeErp#$%',
			   type :'SUPERADMIN'
			})
	    user.save().then((userSaved)=>{
	    	res.json('Admin created successfully');
	    }).catch((err)=>{
	    	console.log(err);
	    	throw err = new Error('Error while creating admin');
	    })
		}
		else{
			res.json('User already created');
		}
	})
})


module.exports = router;