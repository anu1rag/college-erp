
var express = require('express');
var router = express.Router();

router.post('/get_class_one', function(req,res){
   db.models.NewClass.find({_id: req.body._id}).then((classget)=>{
     res.json(classget);
     console.log(classget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});

router.post('/get_class_by_name',function(req,res){
	db.models.NewClass.find({name:req.body.name}).then((classname)=>{
		res.json(classname);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while saving class');
	})
})

router.post('/get_class_all', function(req,res){
   db.models.NewClass.find().then((classget)=>{
     res.json(classget);
     console.log(classget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});


router.post('/class_create', function(req,res){
	var classnew = new db.models.NewClass({
      name: req.body.name,
      section: req.body.section,
      session: req.body.session
	});

	classnew.save().then((classnew)=>{
		res.json(classnew);
		console.log(classnew);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});


router.post('/class_edit',function(req,res){
	db.models.NewClass.findOne({_id: req.body._id}).then((classEdit)=>{
		
		if(classEdit){
			
			classEdit.name = req.body.name;
			classEdit.section =  req.body.section;
			classEdit.session = req.body.session;

		
       classEdit.save().then((newClassEdit)=>{
       	 res.json(newClassEdit);
		console.log(newClassEdit);
       }).catch((err)=>{
       	 console.log(err);
       	 throw err = new Error('Error while saving edited class');

       });
	}
    else{
    	res.json('No class found with given id');
    }
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});


module.exports = router;