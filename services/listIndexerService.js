const exec = require('child_process').exec;

class ListIndexerService {

    constructor() {
    }

    index(filename) {
        return new Promise((resolve, reject) => {
    		exec(`./import "${filename}"`, (error, stdout, stderr) => {
	        	if (error !== null) {
	            	return reject(error);
	        	}
	        	return resolve(stdout);
	    	});	
    	})
    }

    
}

export default ListIndexerService;