import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// pitu.tk/ -Homepages
//pitu.tk/:code ->RedictrectPage
//pitu.tk/:code/stats -> statsPage

import HomePage from '../pages/HomePage';
import RedirectPage from '../pages/RedirectPage';
import StatsPage from '../pages/StatsPage';
import NotFoundPage from '../pages/NotFoundPage'

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/:code" component={RedirectPage} />
                <Route exact path="/:code/stats" component={StatsPage} />
                <Route exact path="/*" component={NotFoundPage} />
            </Switch>
        </Router>
    )
}

export default Routes;