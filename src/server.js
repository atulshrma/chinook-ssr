import express from 'express';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';

import { createConnectionPool } from './db';
import router from './routes';

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'static', 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'static', 'public')));

app.use('/', router);

(async () => {
    await createConnectionPool();

    const port = process.env.BASE_PORT || 3000;

    function listenHandler() {
        console.log(`Running server on port ${port}...`);
    }

    app.listen(port, listenHandler);
})();
