var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var user = new Schema({
    
    type: {
		type: String,
		required: true
		
	},

    username: {
		type: String,
		required: true,
		unique: true
		
	},

    password: {
		type: String,
		required: true
		
	}




});

var teacher = new Schema({
	
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},

	erp_id: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	birthday: {
		type: String,
		required: true
	},
	
	address: {
		type: String,
		required: true
	},
	
	phone: {
		type: String,
		required: true
	},

	email:{
		type: String,
		required: true
	},
	
	gender: {
		type: String,
		required:  true,
		enum: ['Male','Female','Other']
	},

	date_of_join: {
		type: String,
		required: true
	},

	aadhar_num: {
		type: String
	},

	transport: {
		type: Schema.Types.ObjectId,
		ref: 'Transport'

	},

	dormitory: {
		type: Schema.Types.ObjectId,
		ref: 'Dormitory'
	},

	account_name: {
		type: String
	},

	account_number: {
		type:  Number
	},

	ifsc: {
		type:  String
	},

	caste: {
		type:  String,
		required: true
	},

    session: {
   	   type: String,
   	   required: true
   }


	   
}); 

var student = new Schema({
		
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},

	erp_id: {
		type: String,
		required: true
	},

	admission_num: {
		type: String,
	},

	student_contact: {
		type: String,
		required:  true
	},

	parent_contact: {
		type: String,
		required:  true
	},

	name: {
		type: String,
		required:  true
	},

	gender: {
        type: String,
        enum: ['Male','Female','Other'],
        required: true
	},

	birthday: {
		type: String,
		required: true
	},
	class_ref: {
		type: Schema.Types.ObjectId,
		ref: 'NewClass'
        
	},

	address: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	date_of_join: {
		type: String,
		required: true
	},

	aadhar_num: {
		type: String
	},

	transport: {
		type: Schema.Types.ObjectId,
		ref: 'Transport'

	},

	dormitory: {
		type: Schema.Types.ObjectId,
		ref: 'Dormitory'
	},

	account_name: {
		type: String
	},

	account_number: {
		type:  Number
	},

	ifsc: {
		type:  String
	},

	caste: {
		type:  String,
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }
});

//tr = 'ST'+ repeatChar(x.length-z.toString().length,'0') + (z++)
//
var count = new Schema({
	
	count: {
		type: Number,
	    required: true,
	    default: 0
     },

    str: {
    	type: String,
    	required: true,
    	default: '00000001' 
    },
    session:{
    	type: String,
    	required: true
    }

});

var fees = new Schema({
	
	date:{
		type: String,
		required: true
	},

    class_ref: {
    	type: Schema.Types.ObjectId,
    	ref: 'NewClass'
    },

    students:[{
    	student: {
    		type:Schema.Types.ObjectId,
    		ref: 'Student'
    	},

       status: {
       	type: String,
       	required: true,
       	default: 'Unpaid',
       	enum: ['Paid', 'Unpaid']
       },
    }],

    fees:{
       	   type: Array,
       	   required: true
       },

    session: {
    	type: String,
    	required: true
    }

})

var otherstaff = new Schema({
	
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},

	erp_id: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	birthday: {
		type: String,
		required: true
	},
	
	address: {
		type: String,
		required: true
	},
	
	phone: {
		type: String,
		required: true
	},

	email:{
		type: String,
		required: true
	},
	
	gender: {
		type: String,
		required:  true,
		enum: ['Male','Female','Other']
	},

	date_of_join: {
		type: String,
		required: true
	},

	aadhar_num: {
		type: String
	},

	transport: {
		type: Schema.Types.ObjectId,
		ref: 'Transport'

	},

	dormitory: {
		type: Schema.Types.ObjectId,
		ref: 'Dormitory'
	},

	account_name: {
		type: String
	},

	account_number: {
		type:  Number
	},

	ifsc: {
		type:  String
	},

	caste: {
		type:  String,
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }


	   
}); 

var librarian = new Schema({
	
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},

	erp_id: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	birthday: {
		type: String,
		required: true
	},
	
	address: {
		type: String,
		required: true
	},
	
	phone: {
		type: String,
		required: true
	},

	email:{
		type: String,
		required: true
	},
	
	gender: {
		type: String,
		required:  true,
		enum: ['Male','Female','Other']
	},

	date_of_join: {
		type: String,
		required: true
	},

	aadhar_num: {
		type: String
	},

	transport: {
		type: Schema.Types.ObjectId,
		ref: 'Transport'

	},

	dormitory: {
		type: Schema.Types.ObjectId,
		ref: 'Dormitory'
	},

	account_name: {
		type: String
	},

	account_number: {
		type:  Number
	},

	ifsc: {
		type:  String
	},

	caste: {
		type:  String,
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }


	   
}); 


var accountant = new Schema({
	
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},

	erp_id: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	birthday: {
		type: String,
		required: true
	},
	
	address: {
		type: String,
		required: true
	},
	
	phone: {
		type: String,
		required: true
	},

	email:{
		type: String,
		required: true
	},
	
	gender: {
		type: String,
		required:  true,
		enum: ['Male','Female','Other']
	},

	date_of_join: {
		type: String,
		required: true
	},

	aadhar_num: {
		type: String
	},

	transport: {
		type: Schema.Types.ObjectId,
		ref: 'Transport'

	},

	dormitory: {
		type: Schema.Types.ObjectId,
		ref: 'Dormitory'
	},

	account_name: {
		type: String
	},

	account_number: {
		type:  Number
	},

	ifsc: {
		type:  String
	},

	caste: {
		type:  String,
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }


	   
}); 


var newclass = new Schema({
	name: {
		type:  String,
		required:  true
	},
	section: {
		type: String,
		default: 'A',
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }

});



var subject =  new Schema({
	

	name: {
		type: String,
		required:  true
	},

	session: {
   	   type: String,
   	   required: true
   }

});


var student_attendance = new Schema({
   

   class_ref: {
    	type: Schema.Types.ObjectId,
    	ref: 'NewClass'
    },

    lecture_ref: {
    	type: Schema.Types.ObjectId,
    	ref: 'Routine'
    },

    date: {
    	type: String,
    	required: true
    },

    students:[{
    	student:{
    		type:Schema.Types.ObjectId,
    		ref: 'Student'
    	},

    	status:{
    		type: String,
    		required:true
    	}

    }],

    finalize:{
    	type:Boolean,
    	required:true,
    	default: false,
    	enum: [true,false]
    },

	session: {
   	   type: String,
   	   required: true
   }
});


var teacher_attendance = new Schema({
    
    date: {
    	type: String,
    	required: true
    },

    staffs:[{
    	staff:{
    		type:Schema.Types.ObjectId,
    		ref: 'Teacher',
    		required: true
    	},

    	status:{
    		type: String,
    		required:true
    	}

    }],
    
    finalize:{
        type: Boolean,
     	required:true,
     	default: false,
     	enum: [true,false]
     },

	session: {
   	   type: String,
   	   required: true
   }
});

var accountant_attendance = new Schema({
    
    date: {
    	type: String,
    	required: true
    },

    staffs:[{
    	staff:{
    		type:Schema.Types.ObjectId,
    		ref: 'Accountant',
    		required: true
    	},

    	status:{
    		type: String,
    		required:true
    	}

    }],

    finalize:{
    	type:Boolean,
    	required:true,
    	default: false,
    	enum: [true,false]
    },

	session: {
   	   type: String,
   	   required: true
   }
});

var librarian_attendance = new Schema({
    
    date: {
    	type: String,
    	required: true
    },

    staffs:[{
    	staff:{
    		type:Schema.Types.ObjectId,
    		ref: 'Librarian',
    		required: true
    	},

    	status:{
    		type: String,
    		required:true
    	}

    }],

    finalize:{
    	type: Boolean,
    	required:true,
    	default: false,
    	enum: [true,false]
    },

	session: {
   	   type: String,
   	   required: true
   }
});


var other_attendance = new Schema({
    
    date: {
    	type: String,
    	required: true
    },

    staffs:[{
    	staff:{
    		type:Schema.Types.ObjectId,
    		ref: 'OtherStaff',
    		required: true
    	},

    	status:{
    		type: String,
    		required:true
    	}

    }],

    finalize:{
    	type: Boolean,
    	required:true,
    	default: false,
    	enum: [true,false]
    },

	session: {
   	   type: String,
   	   required: true
   }
});


var calendar_event = new Schema({
	
	

	start: {
		type: String,
		required: true
	},

	end: {
		type: String,
		required: true
	},

	type: {
		type: String,
		required: true
	},

	title:{
		type: String,
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }


});


var exam = new Schema({

    name:{
        type:String,
        required:true
    },
	class_ref: {
    	type: Schema.Types.ObjectId,
    	ref: 'NewClass'
    },


	subject_ref: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Subject'
	},

	date: {
		type: String,
		required: true
	},

	duration: {
		type: String,
		required: true
	},

	total_marks: {
		type: Number,
		required: true
	},

	session: {
   	   type: String,
   	   required: true
   }
});

var marks = new Schema({

	exam_ref: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Exam'
	},

	students:[{
		 student: {
		  type: Schema.Types.ObjectId,
		  required: true,
		  ref: 'Student'
		 },
		 marks: {
		  type:String,
		  required: true
		 }
	   
	}],

	session: {
   	   type: String,
   	   required: true
   }
});

var routine = new Schema({

	day: {
       type: String,
       required: true,
       enum: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
	},

	start_time: {
		type: String,
		required: true
	},

	end_time: {
		type: String,
		required: true
	},

	subject_ref: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Subject'
	},

	teacher_ref: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Teacher'
	},

	class_ref: {
    	type: Schema.Types.ObjectId,
    	required: true,
    	ref: 'NewClass'
    },

	session: {
   	   type: String,
   	   required: true
   }


});


var expense_category = new Schema({
	category: {
		type: String,
		required: true
	},
	session:{
		type: String,
		required: true
	}
});



var book = new Schema({
	isbn: {
   	   type: String,
   	   required: true
    },

    title: {
   	   type: String,
   	   required: true
    },

    assigned_from: {
   	   type: String
   	   //date of assignment
    },

    assigned:{
    	type:Boolean,
    	enum: [true,false],
    	required: true
    },

    assigned_to: {
   	   type: Schema.Types.ObjectId,
   	   ref: 'Student'
    },

    assigned_duration:{
    	type: String
    	//number of days
    },

    session: {
   	   type: String,
   	   required: true
   }


});


var transport = new Schema({
    name: {
   	   type: String,
   	   required: true
    },

    vehicle_num: {
    	type: String,
    	required: true
    },
    
    fare: {
   	   type: Number,
   	   required: true
   },

    session: {
   	   type: String,
   	   required: true
   }
});


var dormitory = new Schema({
    name: {
       type: String,
       required: true
    },

    room_num: {
   	   type: String,
   	   required: true
    },

    fare:{
   	   type: Number,
   	   required: true
    },

    room_type:{
       type: String,
       default: 'Non AC',
       enum: ['AC','Non AC']
    },

    session: {
   	   type: String,
   	   required: true
   }



});



var notice = new Schema({
	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true

	},

	date: {
		type: String,
		required: true
	},

	status: {
		type: String,
		default: 'Running',
		enum: ['Running','Archived']
	},

    session: {
   	   type: String,
   	   required: true
   }
});


var system = new Schema({
    name: {
      type: String,
      required: true
    },
    address: {
   	  type: String,
   	  required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
    	type: String,
    	required: true
    },
    sessions: {
    	type: Array,
    	required: true

    },
    current_session:{
    	type: String,
    	required: true
    }

});

var payroll_teacher = new Schema({
	
	date:{
		type: String,
		required: true
	},

    staffs:[{
    	staff: {
    		type:Schema.Types.ObjectId,
    		ref: 'Teacher'
    	},

       status: {
       	type: String,
       	required: true,
       	default: 'Unpaid',
       	enum: ['Paid', 'Unpaid','Cancelled']
       },
    }],

    salary:{
       	   type: Array,
       	   required: true
       },

    session: {
    	type: String,
    	required: true
    }

})



var payroll_accountant = new Schema({
	
	date:{
		type: String,
		required: true
	},

    staffs:[{
    	staff: {
    		type:Schema.Types.ObjectId,
    		ref: 'Accountant'
    	},

       status: {
       	type: String,
       	required: true,
       	default: 'Unpaid',
       	enum: ['Paid', 'Unpaid','Cancelled']
       },
    }],

    salary:{
       	   type: Array,
       	   required: true
       },

    session: {
    	type: String,
    	required: true
    }

})

var payroll_librarian = new Schema({
	
	date:{
		type: String,
		required: true
	},

    staffs:[{
    	staff: {
    		type:Schema.Types.ObjectId,
    		ref: 'Librarian'
    	},

       status: {
       	type: String,
       	required: true,
       	default: 'Unpaid',
       	enum: ['Paid', 'Unpaid','Cancelled']
       },
    }],

    salary:{
       	   type: Array,
       	   required: true
       },

    session: {
    	type: String,
    	required: true
    }

})

var payroll_other = new Schema({
	
	date:{
		type: String,
		required: true
	},

    staffs:[{
    	staff: {
    		type:Schema.Types.ObjectId,
    		ref: 'OtherStaff'
    	},

       status: {
       	type: String,
       	required: true,
       	default: 'Unpaid',
       	enum: ['Paid', 'Unpaid','Cancelled']
       },
    }],

    salary:{
       	   type: Array,
       	   required: true
       },

    session: {
    	type: String,
    	required: true
    }

})


var expense = new Schema({
    
    category:{
    	type: String,
    	required:  true,
    	ref: 'Expense_Category'

    },

    date: {
    	type: String,
    	required: true
    },
    
    title: {
       type: String,
       required: true
    },
    
    amount:{
    	type: String,
    	required: true
    },

    session:{
    	type: String,
    	required: true
    }

   

});

var message = new Schema({
	
	body: {
		type: String,
		required: true
	},

	to: {
		type:Array,
		required:true
	},

	date: {
		type: String,
		required: true
	},

	time: {
		type: String,
		required: true
	},

	current_session:{
		type: String,
		required: true
	}


})


var twilio = new Schema({
	
	account_sid: {
		type: String,
		required: true
	},

	auth_token: {
		type: String,
		required: true
	},

	contact: {
		type: String,
		required: true
	}

});


var nodemailer = new Schema({
	mail: {
		type: String,
		required: true
	},
  	
  	client_id: {
		type: String,
		required: true
	},

  	client_secret: {
		type: String,
		required: true
	},
	
  	refresh_token:  {
		type: String,
		required: true
	}
});



user.pre('save', function(next){
		                                                                                                                               
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
                                                                                                                                                                              
       next()

}    
 });


module.exports = {

	User: mongoose.model('User',user),
	Teacher: mongoose.model('Teacher',teacher),
	Student: mongoose.model('Student',student),
	Librarian: mongoose.model('Librarian',librarian),
	Accountant: mongoose.model('Accountant',accountant),
	OtherStaff: mongoose.model('OtherStaff',otherstaff),
	Book: mongoose.model('Book',book),
	NewClass: mongoose.model('NewClass',newclass),
	Subject: mongoose.model('Subject',subject),
	Routine: mongoose.model('Routine',routine),
	Transport: mongoose.model('Transport',transport),
	Dormitory: mongoose.model('Dormitory',dormitory),
	System: mongoose.model('System',system),
	Notice: mongoose.model('Notice',notice),
	Payroll_Teacher: mongoose.model('Payroll_Teacher',payroll_teacher),
	Payroll_Accountant: mongoose.model('Payroll_Accountant',payroll_accountant),
	Payroll_Librarian: mongoose.model('Payroll_Librarian',payroll_librarian),
	Payroll_Other: mongoose.model('Payroll_Other',payroll_other),
	Expense: mongoose.model('Expense',expense),
	Expense_Category: mongoose.model('Expense_Category',expense_category),
	Message: mongoose.model('Message',message),
	Marks: mongoose.model('Marks',marks),
	Exam: mongoose.model('Exams',exam),
	Calendar: mongoose.model('Calendar',calendar_event),
	Student_Attendance: mongoose.model('Student_Attendance', student_attendance),
	Teacher_Attendance: mongoose.model('Teacher_Attendance',teacher_attendance),
	Accountant_Attendance: mongoose.model('Accountant_Attendance',accountant_attendance),
	Librarian_Attendance: mongoose.model('Librarian_Attendance',librarian_attendance),
	Other_Attendance: mongoose.model('Other_Attendance',other_attendance),
	Twilio : mongoose.model('Twilio',twilio),
	Nodemailer: mongoose.model('Nodemailer',nodemailer),
	Count: mongoose.model('Count', count),
	Fees: mongoose.model('Fees', fees),

}
