var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,(path.join(__dirname,'../public/uploads')))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  },
})
// var fileFilter = function(req, file, cb) {
 
//   // The function should call `cb` with a boolean
//   // to indicate if the file should be accepted
 
//   // To reject this file pass `false`, like so:
//   if(path.extname(file.originalname)=='png')
//   {
//      cb(null, true)
//   }

//   else{
//   	  cb(null, false)

//   }

 
//   // To accept the file pass `true`, like so:
 
 
//   // You can always pass an error if something goes wrong:
//   //cb(new Error('I don\'t have a clue!'))
 
// }
 
//var upload = multer({ storage: storage,limits: 1024*100});
var upload = multer({storage:storage,limits:1024*100});
module.exports = {
	upload: upload
}