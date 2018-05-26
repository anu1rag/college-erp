
var express = require('express');
var router = express.Router(); 


router.post('/system_get',authenticated(['ADMIN']),function(req,res){
   db.models.System.findOne({}).then((system)=>{
   	 res.json(system);
   }).catch((err)=>{
   	  console.log(err);
   	  throw err = new Error('Error occured getting system');
   })
})

router.post('/system_get_session',authenticated(['ADMIN','ACCOUNTANT','LIBRARIAN','TEACHER','OTHER','STUDENT']),function(req,res){
   db.models.System.findOne({}).then((system)=>{
   	 res.json({session:system.current_session});
   }).catch((err)=>{
   	  console.log(err);
   	  throw err = new Error('Error occured while getting session');
   })
})

router.post('/system',authenticated(['ADMIN']),function(req,res){
	db.models.System.findOne({email:req.body.email}).then((system)=>{
		if(system){
			system.name = req.body.name;
			system.current_session = req.body.current_session;
			system.address = req.body.address;
			system.phone = req.body.phone;
		    system.save().then((savedSystem)=>{
              res.json(savedSystem);
		   }).catch((err)=>{
		   	  console.log(err);
		   	  throw  err = new Error('Error while saving system');
		   })
		}

		else{
			var system  = new db.models.System({
			   "name": req.body.name,
    	       "address": req.body.address,
               "phone": req.body.phone,
                "email": req.body.email,
               "current_session": req.body.current_session
			})

			system.save().then((systemEdited)=>{
                res.json(systemEdited);
			}).catch((err)=>{
				throw err = new Error('Error while saving new system');
			})
		}
	})
});

module.exports = router;
