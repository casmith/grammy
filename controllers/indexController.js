const exec = require('child_process').exec;

class IndexController {

    constructor(searchService, listIndexerService) {
        this.searchService = searchService;
        this.listIndexerService = listIndexerService;
    }

    submit(req, res) {
    	const errors = [];
    	if (!req.body.nick) {
    		errors.push("Must provide a value for the field [nick]");
    	}
    	if (!req.body.filename) {
    		errors.push("Must provide a value for the field [filename]");
    	}
    	if (errors.length) {
    		return res.status(400).json({errors}).send();
    	}
    	return this.delete(req.body.nick)
    		.then(() => this.import(req.body))
    		.then(() => res.status(200).send())
    		.catch(e => console.log("Failed to import", e))
    }

    delete(nick) {
    	console.log(`Deleting list entries for ${nick}`);
    	return this.searchService.deleteByQuery({query: {match: {nick}}})
    		.then(r => console.log(`deleted ${r.body.deleted} records`));
    }

    import({filename, nick}) {
    	console.log(`Importing list ${filename} for ${nick}`)
    	return this.listIndexerService.index(filename);
    }
}
export default IndexController;
