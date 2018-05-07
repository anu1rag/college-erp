

var bcrypt = require('bcryptjs');


global.salt =  function(password){
		bcrypt.hashSync(password,10,function(err,hash){
			if (err) throw err;
            else{
			return hash;
		    }
		});
	}

global.compare = function(password,hash){
	bcrypt.compare(password,hash, function(err,res){
		if (err) throw err;
		else{
			return res;
		}
	});
}

global.db = require('./model');

global._ = require('underscore');

global.modules = require('./modules');

global.authenticated = modules.auth.authenticate;
