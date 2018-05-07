
var express = require('express');
var router = express.Router(); 

router.post('/system',function(req,res){
	db.models.System.findOneAndUpdate({_id: req.body._id}, req.body, {upsert: true,new: true},function(err,system){
		if (err) throw err;
		else {
			res.json(system);
			console.log(system);

		}
	})
});

module.exports = router;