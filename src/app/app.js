import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import PrintSchemaList from './views/PrintSchemaList.js';
import PrintView from './views/PrintView.js';

let App = React.createClass({
    render() {
        return (
            <div>
                <RouteHandler/>
            </div>

        );
    }
});

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="printView" path="printView/:name" handler={PrintView}/>
        <DefaultRoute handler={PrintSchemaList}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
