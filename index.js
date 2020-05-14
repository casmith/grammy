import Server from './server';
import ElasticSearchService from './services/elasticSearchService';

const searchService = new ElasticSearchService('http://localhost:9200', 'downloads');

const app = new Server(searchService);

export default app;
