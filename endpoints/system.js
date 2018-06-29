
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


router.post('/get_session_array',authenticated(['ADMIN']),function(req,res){
	db.models.Session.find().then((getsession)=>{
       if(getsession.length>0){
       	 res.json(getsession[0]);
       	 console.log('getsession',getsession)
       }
 
       else{

	  	var getNewSession = new db.models.Session({
	  		sessionArray: [(new Date()).getFullYear().toString()]
	  	});
	  	getNewSession.save().then((createdNewSession)=>{
	  		console.log(createdNewSession);
	  		res.json(createdNewSession);
	  	}).catch((err)=>{
	  	console.log(err);
		throw err = new Error('Error while saving new system');
    })
	  }
		
	});
})

router.post('/promote_session',authenticated(['ADMIN']),function(req,res){
	
	db.models.Session.find().then((getsession)=>{
		if(getsession.length>0){
		  if(getsession[0].sessionArray.indexOf(req.body.changeSession) === -1){
		   // getsession[0].sessionArray.push(req.body.changeSession);
		   getsession[0].sessionArray.push(req.body.changeSession);
          
		   getsession[0].save().then((savedgetsession)=>{
		   	console.log(savedgetsession);
		   	db.models.System.find().then((system)=>{
		   		system[0].current_session = req.body.changeSession;
		   		system[0].save().then((savedsystem)=>{
		   			console.log(savedSystem);
		   			res.json(savedSystem);
		   		}).catch((err)=>{
		   	console.log(err);
		   throw err = new Error('Error while saving new system');
            })	
		   	}).catch((err)=>{
		   	console.log(err);
		   throw err = new Error('Error while saving new system');
              })	
		   	//res.json
		   (savedgetsession);	
		   }).catch((err)=>{
		   	console.log(err);
		   throw err = new Error('Error while saving new system');
    })	
		}
			
	  }

	  else{
	  	var getNewSession = new db.models.Session({
	  		sessionArray: [req.body.changeSession]
	  	});
	  	getNewSession.save().then((createdNewSession)=>{
	  		console.log(createdNewSession);
	  		res.json(createdNewSession);
	  	}).catch((err)=>{
	  	console.log(err);
		throw err = new Error('Error while saving new system');
    })
	  }

	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error while saving new system');
    })
})

router.post('/get_report_session',authenticated(['ADMIN']),function(req,res){
	db.models.Report_Session.find().then((session)=>{
		if(session.length>0){
		     res.json(session[0])
		}

	})
})

router.post('/report_session',authenticated(['ADMIN']),function(req,res){
	db.models.Report_Session.find().then((session)=>{
		if(session.length>0){
		    session[0].current_session = req.body.current_session;
		    session[0].given_session = req.body.given_session;
		}

		else{
			var session = new Schema({
				current_session: req.body.current_session,
				given_session: req.body.given_session
			})
		}

	})
});

module.exports = router;



