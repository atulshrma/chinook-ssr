import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

// import App from '../components/App';
import Apis from '../components/apis';
import Routes from '../components/routes';

const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect('/app');
});

router.get('/app', async (req, res) => {
    res.redirect('/app/landing');
});

router.get('/app/*', async (req, res) => {
    const matchingRoutes = matchRoutes(Routes, req.url);

    matchingRoutes.forEach(async ({ route }) => {
        const { template, component: Component } = route;
        const reactComponent = renderToString(<Component />);

        res.status(200).render(template, { reactComponent });
    });
});

Apis.forEach(handler => {
    (handler.bind(router))();
});

export default router;
