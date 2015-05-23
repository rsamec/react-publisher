import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import FilterableFormGroupList from './views/FilterableFormGroupList.js';
import PrintView from './views/PrintView.js';

let App = React.createClass({
   render() {
        return (
            <div>
                <Navbar brand={<a href='#'>Smart Documents</a>} toggleNavKey={0}>
                    <Nav right eventKey={0}> {/* This is the eventKey referenced */}
                        <NavItem eventKey={1} href='/'>Designer</NavItem>
                        <NavItem eventKey={2} href='~/index.html'>About</NavItem>
                    </Nav>
                </Navbar>
                <RouteHandler/>
            </div>

        );
    }
});

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="printView" path="printView/:name" handler={PrintView}/>
        <DefaultRoute handler={FilterableFormGroupList}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
