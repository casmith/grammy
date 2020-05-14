
class StubSearchService {

    search() {
        console.log('resolving...');
        return Promise.resolve([]);
    }

}

export default StubSearchService;