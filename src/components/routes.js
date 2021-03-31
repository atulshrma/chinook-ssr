import Landing from './landing/Landing.jsx';
import TracksViews from './tracks/views';

const Routes = [
    {
        path: '/app/landing',
        exact: true,
        component: Landing,
        template: 'landing',
    },
    {
        path: '/app/tracks',
        exact: true,
        component: TracksViews.List,
        template: 'tracksList',
    },
    {
        path: '/app/tracks/new',
        exact: true,
        component: TracksViews.New,
        template: 'tracksNew',
    },
];

export default Routes;
