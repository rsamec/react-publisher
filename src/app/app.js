import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import FilterableFormList from './views/FilterableFormList.js';
import PrintView from './views/PrintView.js';
import SearchBar from './components/SearchBar.js';

let App = React.createClass({
    render() {
        var brandName = "ReactDoc";
        return (
            <div>
                <header>
                    <div className="navbar-wrapper">
                        <nav className="navbar navbar-inverse navbar-static-top">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">{brandName}</a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="/designer">Designer</a>
                                    </li>
                                    <li>
                                        <a href="/">About </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>

                <RouteHandler/>
            </div>

        );
    }
});

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="printView" path="printView/:name" handler={PrintView}/>
        <DefaultRoute handler={FilterableFormList}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
