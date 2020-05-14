import Server from './server';

import StubSearchService from './services/stubSearchService';
const searchService = new StubSearchService();

const app = new Server(searchService);

export default app;