import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import App from './App';
import List from './List';

export default () => (
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/list' component={List} />
        </div>
    </Router>
);