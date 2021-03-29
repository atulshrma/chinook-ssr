import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Components from '../components';
import Landing from '../components/landing/index.jsx';

const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect('/welcome');
})

router.get('/welcome', async (req, res) => {
    const reactComponent = renderToString(<Landing />);
    res.status(200).render('landing', { reactComponent });
});

Object.values(Components).forEach(component => {
    (component.bind(router))();
})

export default router;
