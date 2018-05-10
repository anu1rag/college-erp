var express = require('express');
var router = express.Router(); 

router.post('/payroll_get',function(req,res){
	
	db.models.Payroll.findOne({_id: req.body._id}).then((payroll)=>{
		console.log(payroll);
		res.json(payroll);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/payroll_get_user_id',function(req,res){
	db.models.Payroll.find({user_id:req.body.user_id,month:req.body.month,session:req.body.session}).then((payroll)=>{
		res.json(payroll);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error while fetching user payroll with this user id');
	})
})

router.post('/payroll_get_all',function(req,res){
	db.models.Payroll.find().then((payrolls)=>{
		console.log(payrolls);
		res.json(payrolls);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})


router.post('/payroll',function(req,res){
	db.models.Payroll.findOne({user_id:req.body.user_id,month:req.body.month,session:req.body.session}).then((payroll)=>{
      if(payroll){
      	payroll.basic_sal =  req.body.basic_sal,
		payroll.allowances = req.body.allowances,
		payroll.deductions = req.body.deductions,
		payroll.month = req.body.month,
		payroll.status = req.body.status,
		payroll.session = req.body.session
	   payroll.save().then((payrollSaved)=>{
	   	 res.json(payrollSaved);
	   }).catch((err)=>{
	   	  console.log(err);
	   	  throw err = new Error('Error while editing payroll');
	   })
      }

     else{

	    var payroll = new db.models.Payroll({

			user_id: req.body.user_id,
			basic_sal: req.body.basic_sal,
			allowances: req.body.allowances,
			deductions: req.body.deductions,
			month: req.body.month,
			status: req.body.status,
			session: req.body.session
		});

		payroll.save().then((newpayroll)=>{
			res.json(newpayroll);
			console.log(newpayroll);
		}).catch((err)=>{
			console.log(err);
			throw err = new Error('Error occured while putting payroll');

		});

      	
     }


	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error while fetching payroll');
	})
	
});

module.exports = router;