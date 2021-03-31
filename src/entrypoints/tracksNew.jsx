import React from 'react';;
import { hydrate } from 'react-dom';

import TracksNew from '../components/tracks/views/new.jsx';

hydrate(<TracksNew />,document.getElementById('root'),);
