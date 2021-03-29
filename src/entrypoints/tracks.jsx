import React from 'react';;
import { hydrate } from 'react-dom';

import Tracks from '../components/tracks/views/list.jsx';

hydrate(<Tracks />,document.getElementById('root'),);
