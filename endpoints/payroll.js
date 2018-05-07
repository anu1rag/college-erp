
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
		throw err = new Error('Error occured');

	});

});


router.post('/payroll_edit',function(req,res){
	db.models.Payroll.find({_id:req.body._id}).then((payrollEdited)=>{
       payrollEdited = {
		
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		status: req.body.status,
		session: req.body.session
	}
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});
});

module.exports = router;