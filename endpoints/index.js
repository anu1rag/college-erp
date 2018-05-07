glob = require('glob');
path = require('path');
express = require('express');
router = express.Router()

//include all other endpoint definitions
glob('**/*.js', {cwd: __dirname}, (err, files)=>{
 
   if(err)
     console.error('Unable to load endpoints');
    else{
    	//console.log(path.basename(__filename));
    
    _.without(files, path.basename(__filename)).forEach((file)=>{
    	parsed_path = path.parse(file);
      base_route = `/${parsed_path.name}`;
      console.log("Loading endpoints (%s) definition:%s",base_route ,file);
      //console.log(`File loaded is ${__dirname}/${file}`);
      router.use(base_route, require(`${__dirname}/${file}`));

   });
}

});

// if process.env.NODE_ENV isnt 'production'
//   router.use '/docs', modules.auth.basic, express.static("#{ __projectdir }/docs")

module.exports = router