class SearchController {

    constructor(searchService) {
        this.searchService = searchService;
    }

    search(req, res) {
    	console.log("Searching")
        return this.searchService.search(req.query.album)
            .then(results => res.status(200)
                .json(results));
    }
}
export default SearchController;
