
class StubSearchService {

    search() {
        return Promise.resolve([]);
    }

    deleteByQuery() {
    	return Promise.resolve({body: {deleted: 0}});
    }
}

export default StubSearchService;