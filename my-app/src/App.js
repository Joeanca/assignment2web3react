import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HeaderBar from './components/HeaderBar.js';
import Home from './containers/Home.js';
import BrowseCompanies from './containers/BrowseCompanies.js';
import BrowsePortfolio from './containers/BrowsePortfolio';
import Login from './containers/Login.js';
import SingleCompany from './containers/SingleCompany';
import StockVisualizer from './containers/StockVisualizer';
import NotFound from './components/NotFound.js';
import AboutUs from './components/AboutUs.js';

class App extends Component {
    render() {
    return (
      <div>
        <HeaderBar/>
        <main >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/companies" exact component={BrowseCompanies} />
            <Route path="/portfolio" exact component={BrowsePortfolio} />
            <Route path="/login" exact component={Login} />
            <Route path="/company/:id" exact component={SingleCompany} />
            <Route path="/visualizer" exact component={StockVisualizer} />
            {/*<Route path="/users/user/:id" exact component={SingleUser} />
            <PrivateRoute path="/stocks/:id" exact component={SingleStock} />*/}
            <Route path="/aboutus" exact component={AboutUs} />
            <Route component={NotFound}/>
          </Switch>
        </main>
        </div>
    );
  }
}

export default App;
