
var express = require('express');
var router = express.Router();

router.post('/get_expense',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense.find({_id:req.body._id,date:req.body.date,session:req.body.session}).then((expense)=>{
		res.json(expense);
		console.log(expense);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/get_expense_for_category',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense.find({category:req.body.category,session:req.body.session}).populate('category').then((expense)=>{
		res.json(expense);
		console.log(expense);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/get_expense_for_date',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense.find({date:req.body.date,session:req.body.session}).then((expense)=>{
		res.json(expense);
		console.log(expense);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})



router.post('/get_all_expense',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense.find({session:req.body.session}).then((expenses)=>{
		res.json(expenses);
		console.log(expenses);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/category_get_all',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense_Category.find({session:req.body.session}).then((categories)=>{
		res.json(categories);
		console.log(categories);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
})

router.post('/category',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
	db.models.Expense_Category.findOne({category:req.body.category,session:req.body.session}).then((category)=>{
		if(category){
			res.json('Category already exist');
		}

		else{
		   category = new db.models.Expense_Category({category:req.body.category,session: req.body.session});
		   category.save().then((savedCategory)=>{
		   	  res.json(savedCategory);
		   	  console.log(savedCategory);
		   }).catch((err)=>{
			console.log(err);
			throw err = new Error('Error while saving new category');
		 })

	  }
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error while fetching category');
	})
})


router.post('/expense',authenticated(['ADMIN','ACCOUNTANT']),function(req,res){
      db.models.Expense.findOne({_id:req.body._id,session: req.body.session}).then((expense)=>{
      	if(expense){
      	   expense.date = req.body.date;
      	   expense.category = req.body.category;
      	   expense.title = req.body.title;
      	   expense.amount = req.body.amount;
           expense.save().then((savedExpense)=>{
           	console.log(savedExpense);
           	res.json(savedExpense);
           }).catch((err)=>{
           	console.log(err);
           	throw err = new Error('Error while editing expenses');
           })
      	}

      	else{

	      expenseValue = {
	      	date: req.body.date,
	      	category: req.body.category,
	      	title: req.body.title,
	      	amount: req.body.amount,
	      	session: req.body.session
	     }

    var expense = new db.models.Expense(expenseValue);
     expense.save().then((newexpense)=>{
     	res.json(newexpense);
     	console.log(newexpense);
    }).catch((err)=>{
    	console.log(err);
    	throw err = new Error('Saved new expense');
    })
   }

      }).catch((err)=>{
           	console.log(err);
           	throw err = new Error('Error while finding expenses');
    })
 
})

module.exports = router;

