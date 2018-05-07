
var express = require('express');
var router = express.Router();

router.post('/get_expense',function(req,res){
	db.models.find({_id:req.body._id,date:req.body.date}).then((expense)=>{
		res.json(expense);
		console.log(expense);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/get_all_expense',function(req,res){
	db.models.find().then((expenses)=>{
		res.json(expenses);
		console.log(expenses);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})


router.post('/expense_create',function(req,res){
	db.models.Expense.findOneAndUpdate({date:req.body.date}, req.body,{upsert: true},function(err,expense){
		if (err) throw err = new Error('Some error occured');
		else{
		  	res.json(expense);
		    console.log(expense);	
		}

	})
});

module.exports = router;