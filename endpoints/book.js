var express = require('express');
var router = express.Router(); 

router.post('/book_get',authenticated(['LIBRARIAN']),function(req,res){
	
	db.models.Book.findOne({_id: req.body._id}).then((book)=>{
		console.log(book);
		res.json(book);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	})
});

router.post('/book_get_all',authenticated(['LIBRARIAN']),function(req,res){
	db.models.Book.find({}).populate('assigned_to').then((books)=>{
		console.log(books);
		res.json(books);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	
	})
})


router.post('/book',authenticated(['LIBRARIAN']),function(req,res){
	db.models.Book.findOne({title:req.body.title,isbn:req.body.isbn}).then((book)=>{
		if(!book){
			var book = new db.models.Book({
            title: req.body.title,
            isbn: req.body.isbn,
            assigned: req.body.assigned,
            assigned_to: req.body.assigned_to,
            assigned_from: req.body.assigned_from,
            assigned_duration: req.body.assigned_duration,
   		    session: req.body.session

	    });

	book.save().then((newbook)=>{
		res.json(newbook);
		console.log(newbook);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Error occured');

	});
	}

	else{
		res.json('book already exist');
	}
	});
	

});


router.post('/book_edit',authenticated(['LIBRARIAN']),function(req,res){
	console.log(req.body);
	db.models.Book.findOne({_id:req.body._id}).then((bookEdited)=>{
      if(bookEdited){
    
		bookEdited.title =  req.body.title;
		bookEdited.isbn =  req.body.isbn;
		bookEdited.assigned = req.body.assigned;
		bookEdited.assigned_to =  req.body.assigned_to;
		bookEdited.assigned_from =  req.body.assigned_from;
		bookEdited.assigned_duration = req.body.assigned_duration
		bookEdited.session = req.body.session;
 
    bookEdited.save().then((editedbook)=>{
    	res.json(editedbook);
    	console.log(editedbook);
    }).catch((err)=>{
        console.log(err);
    	throw err = new Error('Error while editing book');
    });
    }

    else{
    	res.json('No book with given id');
    }
	}).catch((err)=>{
		console.log(err);

		throw err = new Error('Error while editing');

	});

});
module.exports = router;