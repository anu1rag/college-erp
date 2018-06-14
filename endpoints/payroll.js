

var express = require('express');
var router = express.Router();

router.post('/get_payroll_teacher_one',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Teacher.findOne({_id: req.body._id}).populate('staffs.staff').then((payrollget)=>{
     res.json(payrollget);
     console.log(payrollget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});

router.post('/get_payroll_for_teacher_all',authenticated(['ADMIN']),function(req,res){
	db.models.Payroll_Teacher.find({session:req.body.session}).populate('staffs.staff').then((payrollname)=>{
		res.json(payrollname);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while saving payroll');
	})
})



router.post('/payroll_create_teacher',authenticated(['ADMIN']),function(req,res){
	var payrollnew = new db.models.Payroll_Teacher({
      date: req.body.date,
      staffs: req.body.staffs,
      salary: req.body.salary,
      session: req.body.session
	});

	payrollnew.save().then((payrollnew)=>{
		res.json(payrollnew);
		console.log(payrollnew);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});

router.post('/payroll_edit_teacher',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Teacher.findOne({_id: req.body._id}).then((getpayroll)=>{
   	console.log(getpayroll);
   	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
       getpayroll.staffs[staffIndex[0]]['status'] = req.body.status;
       getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })

   	  }
   	}).catch((err)=>{
   		console.log(err);
   			throw err = new Error('Error while fetching payroll for editing');
   	})
})

router.post('/payroll_remove_teacher',authenticated(['ADMIN']),function(req,res){
  db.models.Payroll_Teacher.findOne({_id:req.body._id}).then((getpayroll)=>{
	console.log(getpayroll);
	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
   	  	getpayroll.staffs.splice(staffIndex[0],1);
   	  	getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })
	}
    }).catch((err)=>{
   		console.log(err);
     	throw err = new Error('Error while fetching payroll for editing');

})
});

router.post('/get_payroll_accountant_one',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Accountant.findOne({_id: req.body._id}).populate('staffs.staff').then((payrollget)=>{
     res.json(payrollget);
     console.log(payrollget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});

router.post('/get_payroll_for_accountant_all',authenticated(['ADMIN']),function(req,res){
	db.models.Payroll_Accountant.find({session:req.body.session}).populate('staffs.staff').then((payrollname)=>{
		res.json(payrollname);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while saving payroll');
	})
})



router.post('/payroll_create_accountant',authenticated(['ADMIN']),function(req,res){
	var payrollnew = new db.models.Payroll_Accountant({
      date: req.body.date,
      staffs: req.body.staffs,
      salary: req.body.salary,
      session: req.body.session
	});

	payrollnew.save().then((payrollnew)=>{
		res.json(payrollnew);
		console.log(payrollnew);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});

router.post('/payroll_edit_accountant',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Accountant.findOne({_id: req.body._id}).then((getpayroll)=>{
   	console.log(getpayroll);
   	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
       getpayroll.staffs[staffIndex[0]]['status'] = req.body.status;
       getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })

   	  }
   	}).catch((err)=>{
   		console.log(err);
   			throw err = new Error('Error while fetching payroll for editing');
   	})
})

router.post('/payroll_remove_accountant',authenticated(['ADMIN']),function(req,res){
  db.models.Payroll_Accountant.findOne({_id:req.body._id}).then((getpayroll)=>{
	console.log(getpayroll);
	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
   	  	getpayroll.staffs.splice(staffIndex[0],1);
   	  	getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })
	}
    }).catch((err)=>{
   		console.log(err);
     	throw err = new Error('Error while fetching payroll for editing');

})
});

router.post('/get_payroll_librarian_one',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Librarian.findOne({_id: req.body._id}).populate('staffs.staff').then((payrollget)=>{
     res.json(payrollget);
     console.log(payrollget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});

router.post('/get_payroll_for_librarian_all',authenticated(['ADMIN']),function(req,res){
	db.models.Payroll_Librarian.find({session:req.body.session}).populate('staffs.staff').then((payrollname)=>{
		res.json(payrollname);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while saving payroll');
	})
})



router.post('/payroll_create_librarian',authenticated(['ADMIN']),function(req,res){
	var payrollnew = new db.models.Payroll_Librarian({
      date: req.body.date,
      staffs: req.body.staffs,
      salary: req.body.salary,
      session: req.body.session
	});

	payrollnew.save().then((payrollnew)=>{
		res.json(payrollnew);
		console.log(payrollnew);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});

router.post('/payroll_edit_librarian',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Librarian.findOne({_id: req.body._id}).then((getpayroll)=>{
   	console.log(getpayroll);
   	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
       getpayroll.staffs[staffIndex[0]]['status'] = req.body.status;
       getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })

   	  }
   	}).catch((err)=>{
   		console.log(err);
   			throw err = new Error('Error while fetching payroll for editing');
   	})
})

router.post('/payroll_remove_librarian',authenticated(['ADMIN']),function(req,res){
  db.models.Payroll_Librarian.findOne({_id:req.body._id}).then((getpayroll)=>{
	console.log(getpayroll);
	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
   	  	getpayroll.staffs.splice(staffIndex[0],1);
   	  	getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })
	}
    }).catch((err)=>{
   		console.log(err);
     	throw err = new Error('Error while fetching payroll for editing');

})
});

router.post('/get_payroll_other_one',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Other.findOne({_id: req.body._id}).populate('staffs.staff').then((payrollget)=>{
     res.json(payrollget);
     console.log(payrollget);
   }).catch((err)=>{
   	   console.log(err);
   	   throw err = new Error('Some error occured');
   });
});

router.post('/get_payroll_for_other_all',authenticated(['ADMIN']),function(req,res){
	db.models.Payroll_Other.find({session:req.body.session}).populate('staffs.staff').then((payrollname)=>{
		res.json(payrollname);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured while saving payroll');
	})
})



router.post('/payroll_create_other',authenticated(['ADMIN']),function(req,res){
	var payrollnew = new db.models.Payroll_Other({
      date: req.body.date,
      staffs: req.body.staffs,
      salary: req.body.salary,
      session: req.body.session
	});

	payrollnew.save().then((payrollnew)=>{
		res.json(payrollnew);
		console.log(payrollnew);
	}).catch((err)=>{
		console.log(err);
		throw err = new Error('Some error occured');
	});
});

router.post('/payroll_edit_other',authenticated(['ADMIN']),function(req,res){
   db.models.Payroll_Other.findOne({_id: req.body._id}).then((getpayroll)=>{
   	console.log(getpayroll);
   	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
       getpayroll.staffs[staffIndex[0]]['status'] = req.body.status;
       getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })

   	  }
   	}).catch((err)=>{
   		console.log(err);
   			throw err = new Error('Error while fetching payroll for editing');
   	})
})

router.post('/payroll_remove_other',authenticated(['ADMIN']),function(req,res){
  db.models.Payroll_Other.findOne({_id:req.body._id}).then((getpayroll)=>{
	console.log(getpayroll);
	var staffs = getpayroll.staffs;
   	var staffIndex = [];
   	if(getpayroll){
   	  _.each(staffs,(staff,index)=>{
   	  	if(staff.staff == req.body.staff_id){
   	  		console.log(staff.staff == req.body.staff_id);
   	  		staffIndex.push(index);
   	  	}
   	  })
   	  	console.log('staffIndex:',staffIndex);
   	  	getpayroll.staffs.splice(staffIndex[0],1);
   	  	getpayroll.save().then((savedgetpayroll)=>{
          console.log(savedgetpayroll);

          res.json(savedgetpayroll);
       }).catch((err)=>{
       	console.log(err);
       	throw err = new Error('Error while editing payroll');
       })
	}
    }).catch((err)=>{
   		console.log(err);
     	throw err = new Error('Error while fetching payroll for editing');

})
});
module.exports = router;