
var express = require('express');
var router = express.Router();



router.post('/upload',upload.single('image'),function(req,res){
	console.log(req.file);
	console.log(req);
  var uploadFile = new db.models.Upload({
  	filename: req.file.filename,
  	path: req.file.path
  });
  uploadFile.save().then((savedFile)=>{
  	res.json(savedFile);
  }).catch((err)=>{
  	console.log(err);
  	throw err = new Error('Error while uploading file');
  })
});

router.post('/edit',upload.single('image'),function(req,res){
	console.log(req);
	db.models.Upload.findOne({_id:req.body.image_id}).then((avatar)=>{
		if(avatar){
			avatar.filename = req.file.filename;
			avatar.path = req.file.path;
			avatar.save().then((newavatar)=>{
				res.json(newavatar);
			}).catch((err)=>{
		  	console.log(err);
		  	throw err = new Error('Error while editing file');
		  })
		}

		else{
          var uploadFile = new db.models.Upload({
		  	filename: req.file.filename,
		  	path: req.file.path
		  });
		  uploadFile.save().then((savedFile)=>{
		  	res.json(savedFile);
		  }).catch((err)=>{
		  	console.log(err);
		  	throw err = new Error('Error while uploading file');
		  })
		}
	})
})


module.exports = router;