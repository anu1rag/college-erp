
var express = require('express');
var router = express.Router();

router.post('/get_expense',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.find({_id:req.body._id,date:req.body.date,session:req.body.session}).then((expense)=>{
		res.json(expense);
		console.log(expense);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/get_all_expense',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.find({session:req.body.session}).then((expenses)=>{
		res.json(expenses);
		console.log(expenses);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})


router.post('/expense_create',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense.findOneAndUpdate({date:req.body.date,session:req.body.session}, req.body,{upsert: true},function(err,expense){
		if (err) throw err = new Error('Some error occured');
		else{
		  	res.json(expense);
		    console.log(expense);	
		}

	})
});

module.exports = router;