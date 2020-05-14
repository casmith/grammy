import express from 'express';
import bodyParser from 'body-parser';
import searchRoutes from './routes/searchRoutes.js';
import StubSearchService from './services/stubSearchService';
const searchService = new StubSearchService();

function Server(searchService) {
    // Instantiate express
    const app = express();
    // Set our port
    const port = process.env.PORT || 8000;
    // Configure app to user bodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Register our routes in app
    // app.use('/', routes);
    app.use('/search', searchRoutes(searchService));

    app.get('/', (req, res) => res.send([]));

    // Start our server
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    return app;
}

export default Server;
