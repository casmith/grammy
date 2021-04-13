import Server from './server';
import ElasticSearchService from './services/elasticSearchService';
import listIndexerService from './services/listIndexerService';

const elasticSearchBaseUrl = process.env.ES_BASE_URL || 'http://localhost:9200';
const elasticSearchIndex = process.env.ES_INDEX || 'downloads';

const searchService = new ElasticSearchService(elasticSearchBaseUrl, elasticSearchIndex);
const listIndexerService = new listIndexerService();

const app = new Server(searchService, listIndexerService);

export default app;
