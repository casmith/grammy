import chai from 'chai';
import chaiHttp from 'chai-http';
import Server from '../server';
import StubSearchService from '../services/stubSearchService';

const searchService = new StubSearchService();
const stubListIndexerService = {
	index: () => Promise.resolve()
}
const app = new Server(searchService, stubListIndexerService);

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

describe('Index', () => {
	describe('empty put request', () => {
		it('returns a 400', () => {
			return chai.request(app)
				.put('/index')
				.then(res => res.should.have.status(400));	
		});
	});
	describe('put request without a nick', () => {
		it('returns a 400', () => {
			return chai.request(app)
				.put('/index', {filename: "filename.txt"})
				.then(res => res.should.have.status(400));	
		});
	});
	describe('put request without a filename', () => {
		it('returns a 400', () => {
			return chai.request(app)
				.put('/index', {nick: "nick"})
				.then(res => res.should.have.status(400));	
		});
	});
	describe('put request with all required fields', () => {
		it('returns a 200', () => {
			return chai.request(app)
				.put('/index')
				.send({nick: "nick", filename: "filename"})
				.then(res => res.should.have.status(200));	
		});
	});
});
