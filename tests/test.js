import chai from 'chai';
import chaiHttp from 'chai-http';
import Server from '../server';
import StubSearchService from '../services/stubSearchService';

const searchService = new StubSearchService();
const app = new Server(searchService);

chai.use(chaiHttp);
chai.should();

describe('Search', () => {
    describe('empty search', () => {
        it('finds some results', () => {
            return chai.request(app)
                .get('/search')
                .then(res => res.body.should.be.a('array'));
        });
    });
});
