var express = require('express');
var router = express.Router(); 

router.post('/transport_get',authenticated(['ADMIN']),function(req,res){
	
	db.models.Transport.findOne({_id: req.body._id}).then((vehicle)=>{
		console.log(vehicle);
		res.json(vehicle);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/transport_get_all',authenticated(['ADMIN']),function(req,res){
	db.models.Transport.find({}).then((vehicles)=>{
		console.log(vehicles);
		res.json(vehicles);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})

router.post('/transport_get_vehicle',authenticated(['ADMIN']),function(req,res){
	db.models.Transport.findOne({vehicle_num:req.body.vehicle_num}).then((transport)=>{
		if(transport){

			console.log(transport);
			res.json(transport);
		}

		else{
			res.json('No such transport exists');
		}
		
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while getting vehicle_num of transport');
	
	})
})


router.post('/transport',authenticated(['ADMIN']),function(req,res){
	db.models.Transport.findOne({name:req.body.name}).then((transport)=>{
		if(!transport){
			var transport = new db.models.Transport({
            name: req.body.name,
            vehicle_num: req.body.vehicle_num,
            fare: req.body.fare,
   		    

	    });

	transport.save().then((newtransport)=>{
		res.json(newtransport);
		console.log(newtransport);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});
	}

	else{
		res.json('transport already exist');
	}
	});
	

});


router.post('/transport_edit',authenticated(['ADMIN']),function(req,res){
	db.models.Transport.findOne({_id:req.body._id}).then((transportEdited)=>{
      if(transportEdited){
    
		transportEdited.name =  req.body.name;
		transportEdited.vehicle_num =  req.body.vehicle_num;
		transportEdited.fare =  req.body.fare;
 
    transportEdited.save().then((editedtransport)=>{
    	res.json(editedtransport);
    }).catch((err)=>{

    	throw err = new Error('Error while editing transport');
    });
    }

    else{
    	res.json('No transport with given id');
    }
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});

});


module.exports = router;