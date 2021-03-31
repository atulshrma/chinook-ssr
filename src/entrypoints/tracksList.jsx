import React from 'react';;
import { hydrate } from 'react-dom';

import TracksList from '../components/tracks/views/list.jsx';

hydrate(<TracksList />,document.getElementById('root'),);
