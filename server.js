import express from 'express';
import bodyParser from 'body-parser';
import indexRoutes from './routes/indexRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

function Server(searchService, listIndexerService) {
	const app = express();
    const port = process.env.PORT || 8000;
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.use('/index', indexRoutes(searchService, listIndexerService));
	app.use('/search', searchRoutes(searchService));
    
    app.listen(port, () => console.log(`Server started on port ${port}`));

    return app;
}

export default Server;
