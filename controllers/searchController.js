class SearchController {

    constructor(searchService) {
        this.searchService = searchService;
    }

    search(req, res) {
        return this.searchService.search()
            .then(res.status(200).json([]));
    }
}
export default SearchController;
