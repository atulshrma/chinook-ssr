import React from 'react';
import { renderToString } from 'react-dom/server';
import Controllers from './controllers';
import Views from './views';

export default function () {
    this.get('/tracks', async (req, res) => {
        const reactComponent = renderToString(<Views.List />);
        res.status(200).render('tracks', { reactComponent });
    });

    this.get('/api/tracks', async (req, res) => {
        const { tracks, totalPages, hasNext } = await Controllers.List(req);
        res.json({ tracks, totalPages, hasNext });
    });
}
