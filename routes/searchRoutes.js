import { Router } from 'express';
import SearchController from '../controllers/searchController.js';

const init = (searchService) => {
    const controller = new SearchController(searchService);
    const routes = Router();

    routes.get('/', (req, res) => controller.search(req, res));
    return routes;
}

export default init;
