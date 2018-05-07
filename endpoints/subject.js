var express = require('express');
var router = express.Router(); 

router.post('/subject_get',function(req,res){
	
	db.models.Subject({_id: req.body._id}).then((subject)=>{
		console.log(subject);
		res.json(subject);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});


router.post('/subject_get_all',function(req,res){
	db.models.Subject.find().then((subjects)=>{
		console.log(subjects);
		res.json(subjects);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})



router.post('/subject',function(req,res){
	db.models.Subject.findOne({name:req.body.name}).then((subject)=>{
		if(!subject){
			var subject = new db.models.Subject({
            name: req.body.name,
		   session: req.body.session
	    });

	subject.save().then((newsubject)=>{
		res.json(newsubject);
		console.log(newsubject);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});
	}

	else{
		res.json('subject already exist');
	}
	});
	

});


router.post('/subject_edit',function(req,res){
	db.models.Subject.findOne({_id:req.body._id}).then((subjectEdited)=>{
      if(subjectEdited){
    
		subjectEdited.name =  req.body.name;
		subjectEdited.session = req.body.session;
 
    subjectEdited.save().then((editedSubject)=>{
    	res.json(editedSubject);
    }).catch((err)=>{

    	throw err = new Error('Error while editing subject');
    });
    }

    else{
    	res.json('No subject with given id');
    }
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});

});

module.exports = router;