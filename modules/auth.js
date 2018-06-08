var jwt = require('jsonwebtoken');

module.exports = {

	authenticate : (roles)=> {
		return (req,res,next)=> {
            if(req.headers.authorization){
            	var bearer = req.headers.authorization.split(" ")[1]
            	console.log(bearer);
            	var session_token = bearer;
            }
            else if(req.body.access_token){
            	var session_token = req.body.access_token;
            }

            else {
            	 res.json('No token found');
            }

            if(session_token){
            	jwt.verify(session_token,'@5bjuitioh45t_#vkiyyilr$%_c',function(err,decoded){
            		if (err) throw err = new Error('Error while decoding token');
            		else if(!decoded){
                       res.json('Invalid token');
            		}

            		else{
            			console.log(decoded);
            			if(_.contains(roles,decoded.user.type)){
            				next();
            			}

            			else{
            				res.json('Unauthorized access');
            			}
            		} 
            	});

            }
		}
	}
}

