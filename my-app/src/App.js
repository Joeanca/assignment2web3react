import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom';
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
    constructor(props){
        super(props);
        this.state = {
          userid: 119,
          isAuthenticated: true
        };
    }
    render() {
    return (
      <div>
        <HeaderBar/>
        <main >
          <Switch>
            <Route path="/" exact component={Home} user={this.state.userid}/>
            <Route path="/home" exact component={Home} user={this.state.userid}/>
            <Route path="/companies" exact component={BrowseCompanies} user={this.state.userid}/>
            <Route path="/portfolio" exact component={BrowsePortfolio}  user={this.state.userid}/>
            <Route path="/login" exact component={Login} user={this.state.userid}/>
            <Route path="/company/:id" exact component={SingleCompany} user={this.state.userid}/>
            {/*<Route path="/visualizer" exact component={StockVisualizer} user={this.state.userid} " onEnter="{authCheck}"/>*/}
            <Route path="/visualizer" exact render={(props) => (<StockVisualizer userid={this.state.userid} isAuthenticated={this.state.isAuthenticated} />) }/>
            {/*<Route path="/users/user/:id" exact component={SingleUser} />
            <PrivateRoute path="/stocks/:id" exact component={SingleStock} />*/}
            <Route path="/aboutus" exact component={AboutUs} user={this.state.userid}/>
            <Route component={NotFound}/>
          </Switch>
        </main>
        </div>
    );
  }
}

export default App;

//https://til.hashrocket.com/posts/z8cimdpghg-passing-props-down-to-react-router-route
// <Route
//   path="/my/path"
//   render={(routeProps) => (
//     <MyComponent {...routeProps} {...props} />
//   )}
// />