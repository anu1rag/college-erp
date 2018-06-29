
var express = require('express');
var router = express.Router();
var http = require("http");

router.post('/msg91_create',authenticated(['ADMIN']),function(req,res){
	db.models.MSG.findOne({_id:req.body._id}).then((msg91Value)=>{
    if(!msg91Value){
      var msg91_dataval = new db.models.MSG({

          auth_key: req.body.auth_key,
      });

      msg91_dataval.save().then((msg91_data)=>{
        res.json(msg91_data);
        console.log(msg91_data);
      }).catch((err)=>{
        console.log(err);
        throw err = new Error('Some error occured');
      });
    }

    else{
      msg91Value.auth_key = req.body.auth_key;

       msg91Value.save().then((msg91_data)=>{
        res.json(msg91_data);
      }) .catch((err)=>{
        console.log(err);
        throw err = new Error('Some error occured');
      })
    }
  }).catch((err)=>{
        console.log(err);
        throw err = new Error('Some error occured');
   });
	
});

router.post('/get_msg91',authenticated(['ADMIN']),function(req,res){
    db.models.MSG.find().then((msg91_data)=>{
        if(msg91_data.length > 0){
            res.json({_id:msg91_data[0]['_id']});
        }
    }).catch((err)=>{
            console.log(err);
            throw err = new Error('Some error occured while fetching msg91');
        })
})


router.post('/send_msg91',function(req,res){
db.models.MSG.findOne({_id:req.body.msg91}).then((msg91_data)=>{
 if(msg91_data){
   var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};

var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);

  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    //console.log(body.toString());
      console.log("body:",body.toString());
      res.json(body.toString());

  });
});


request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms: 
   [ { message: req.body.message, to: req.body.to }
     // { message: 'This  is  for anurag2 and ankit2', to: [ '9810756606', '8272031510' ] } 
     ]}));
request.end();

 
 }
 }).catch((err)=>{
    console.log(err);
    throw err = new Error('Some error occured while fetching msg91');
})

})

router.post('/send_msg91_marks',authenticated(['ADMIN']),function(req,res){
 db.models.MSG.findOne({_id: req.body.msg91}).then((msg91_data)=>{
console.log("msg91_data",msg91_data)
if(msg91_data){

var messageArray = [];
var messageArray = req.body.students.map((student)=>{
  return  {message: 'Hey  your child ' + student.name + ' has secured ' + student.marks + ' marks in ' + req.body.subject + ' in ' + req.body.exam,
          to:[student.contact] 
        }
})
 var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};



var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});


request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms: messageArray}));
request.end(); 

}
}).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})


router.post('/send_msg91_attendance_staff',authenticated(['ADMIN']),function(req,res){
 db.models.MSG.findOne({_id: req.body.msg91}).then((msg91_data)=>{
console.log("msg91_data",msg91_data)
if(msg91_data){

var messageArray = [];
var messageArray = req.body.staffs.map((staff)=>{
  return {message: 'Your status is  marked as '+ staff.status + ' dated on ' + req.body.date,
          to:[staff.contact] 
        }
})
 var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};


var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});


request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms: messageArray}));
request.end(); 

}
}).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})

router.post('/send_msg91_new_staff',authenticated(['ADMIN']),function(req,res){
  db.models.MSG.findOne({_id:req.body.msg91}).then((msg91_data)=>{
    console.log("msg91_data",msg91_data);
    var user = req.body.user;
    if(msg91_data){
   

  var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};


var to = (user.admin_contact)? [user.admin_contact]: [user.phone];
var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});


request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms:[{message:'Hello  '+user.name+ ' your erp account is  successfully created,your username is '+user.email+' and your default password is 12345. Please login into your dashboard immediately and change your default password',
       to:to}] }));
request.end(); 


}
  }).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})

router.post('/send_msg91_edit_staff',authenticated(['ADMIN']),function(req,res){

  db.models.MSG.findOne({_id:req.body.msg91}).then((msg91_data)=>{
    console.log("msg91_data",msg91_data);
    if(msg91_data){
   
  var user = req.body.user; 
  var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};

var to = (user.admin_contact)? [user.admin_contact]: [user.phone];

var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});

request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms:[{message: 'Hey ' + user.name+ 'your erp account is successfully updated,Please visit Profile section of your respective dashboard to see the changes',
    to:to}] }));
request.end(); 


}
  }).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})


router.post('/send_msg91_new_student',authenticated(['ADMIN']),function(req,res){
  db.models.MSG.findOne({_id:req.body.msg91}).then((msg91_data)=>{
    console.log("msg91_data",msg91_data);
  
    if(msg91_data){
   
  var user = req.body.user;
  var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};

var messageArray = [{message:'Hello  '+user.guardian+ ' your child ' + user.name + ' erp account is  successfully created,your username is '+user.email+' and your default password is 12345. Please login into your dashboard immediately and change your default password',
                     to:[user.parent_contact]}]
if(user.student_contact){
  messageArray.push({message:'Hello  '+user.name+ ' your erp account is  successfully created,your username is '+user.email+' and your default password is 12345. Please login into your dashboard immediately and change your default password',
       to:[user.student_contact]})
}

var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});



request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms:messageArray}));
request.end(); 


}
  }).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})

router.post('/send_msg91_edit_student',authenticated(['ADMIN']),function(req,res){
  db.models.MSG.findOne({_id:req.body.msg91}).then((msg91_data)=>{
    console.log("msg91_data",msg91_data);
  
    if(msg91_data){
   
  var user = req.body.user;
  var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};


 var messageArray = [{message: 'Hey ' + user.guardian + ' your child '+ user.name+' erp account is  successfully updated,Please visit Profile section of your respective dashboard to see the changes',
        to:[user.parent_contact]
       }]
if(user.student_contact){
  messageArray.push({
    message: 'Hey ' + user.name+ ' your erp account is  successfully updated,Please vis it Profile section of your respective dashboard to see the changes',
    to:[user.student_contact]     
  });
}
var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});


request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms:messageArray}));
request.end(); 


}
  }).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})




router.post('/send_msg91_attendance_student',authenticated(['ADMIN']),function(req,res){
 db.models.MSG.findOne({_id: req.body.msg91}).then((msg91_data)=>{
console.log("msg91_data",msg91_data)
if(msg91_data){

var messageArray = [];
var messageArray = req.body.students.map((student)=>{
  return {message: 'Your child '+ student.name + ' status is  marked as '+ student.status + ' dated on ' + req.body.date,
          to:[student.contact] 
        }
})

 var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms",
  "headers": {
    "authkey":msg91_data.auth_key ,
    "content-type": "application/json"
  }
};



var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});



request.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms: messageArray}));

request.end();


}
}).catch((err)=>{
    console.log(err);
    throw err = new Error('Error while fetching msg91')
  })
})


module.exports = router;
