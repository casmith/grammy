import { Router } from 'express';
import IndexController from '../controllers/indexController.js';

const init = (searchService, listIndexService) => {
    const controller = new IndexController(searchService, listIndexService);
    const routes = Router();

    routes.put('/', (req, res) => controller.submit(req, res));
    return routes;
}

export default init;
