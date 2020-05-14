import express from 'express';
import bodyParser from 'body-parser';
import searchRoutes from './routes/searchRoutes.js';

function Server(searchService) {
    const app = express();
    const port = process.env.PORT || 8000;
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.use('/search', searchRoutes(searchService));

    app.listen(port, () => console.log(`Server started on port ${port}`));

    return app;
}

export default Server;
