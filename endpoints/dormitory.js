var express = require('express');
var router = express.Router(); 

router.post('/dormitory_get',authenticated(['ADMIN']),function(req,res){
	
	db.models.Dormitory.findOne({_id: req.body._id}).then((dormitory)=>{
		console.log(dormitory);
		res.json(dormitory);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/dormitory_get_all',authenticated(['ADMIN']),function(req,res){
	db.models.Dormitory.find().then((dormitories)=>{
		console.log(dormitories);
		res.json(dormitories);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})

router.post('/dormitory_get_room',authenticated(['ADMIN']),function(req,res){
	db.models.Dormitory.findOne({room_num:req.body.room_num}).then((dormitory)=>{
		if(dormitory){

			console.log(dormitory);
			res.json(dormitory);
		}

		else{
			res.json('No such dormitory exists');
		}
		
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while getting room_num of dormitory');
	
	})
})


router.post('/dormitory',authenticated(['ADMIN']),function(req,res){
	db.models.Dormitory.findOne({name:req.body.name,room_num:req.body.room_num,room_type: req.body.room_type,fare: req.body.fare}).then((dormitory)=>{
		if(!dormitory){
			var dormitory = new db.models.Dormitory({
            name: req.body.name,
            room_num: req.body.room_num,
            room_type: req.body.room_type,
            fare: req.body.fare,
   		    

	    });

	dormitory.save().then((newdormitory)=>{
		res.json(newdormitory);
		console.log(newdormitory);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});
	}

	else{
		res.json('dormitory already exist');
	}
	});
	

});


router.post('/dormitory_edit',authenticated(['ADMIN']),function(req,res){
	db.models.Dormitory.findOne({_id:req.body._id}).then((dormitoryEdited)=>{
      if(dormitoryEdited){
    
		dormitoryEdited.name =  req.body.name;
		dormitoryEdited.room_num =  req.body.room_num;
		dormitoryEdited.room_type = req.body.room_type;
		dormitoryEdited.fare =  req.body.fare;
		
 
    dormitoryEdited.save().then((editeddormitory)=>{
    	res.json(editeddormitory);
    }).catch((err)=>{

    	throw err = new Error('Error while editing dormitory');
    });
    }

    else{
    	res.json('No dormitory with given id');
    }
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});

});


module.exports = router;
