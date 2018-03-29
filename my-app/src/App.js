import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
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
          userid: 116,
          isAuthenticated : false
        };
    }
    changeAuth=(bool)=>{
        this.setState({isAuthenticated :true});
    }
    logout=()=>{
        this.setState({isAuthenticated: false});
    }
    setProps=(data)=>{
        this.setState({tempProps: [data]});
    }
    getProps = ()=>{if (this.state.tempProps) return this.state.tempProps
      else return null;
    }
    render() {
      console.log(this.props)
    const PrivateRoute = ({ component: Component, ...rest }) =>{
       return (
        this.state.isAuthenticated ? 
          {...rest}:
        <Redirect  to={{pathname: "/login",
          state: { from: {...rest}.location.pathname, symbol: {...rest}.computedMatch.params.id},
          symbol:{...rest}.computedMatch.params.id
        }} />
        
        // console.log({...rest}.location.pathname),
        // console.log({...rest})
    )};
    return (
      <div>
        {this.state.isAuthenticated?<HeaderBar logoutfn={this.logout}/>:null}
        <main >
          <Switch >
            <PrivateRoute path="/" exact render={(props) => (<Home userid={this.state.userid} />) }/>
            <PrivateRoute path="/home" exact render={(props) => (<Home userid={this.state.userid} />) }/>
            <PrivateRoute path="/companies" exact render={(props) => (<BrowseCompanies userid={this.state.userid}  />) }/>
            <PrivateRoute path="/portfolio" exact render={(props) => (<BrowsePortfolio userid={this.state.userid}  />) }/>
            <Route path="/login" exact render={(props) => (<Login userid={this.state.userid}  auth={this.changeAuth} history={this.history} from={props.location} isAuthenticated={this.state.isAuthenticated}/>) }/>
            <PrivateRoute path="/company/:id" exact render={(props) => (<SingleCompany props={this.props} smtg={props} userid={this.state.userid} />) }/>
            <PrivateRoute path="/visualizer" exact render={(props) => (<StockVisualizer  userid={this.state.userid} />) }/>
            <PrivateRoute path="/aboutus" exact render={(props) => (<AboutUs userid={this.state.userid} />) }/>
            <PrivateRoute render={(props) => (<NotFound userid={this.state.userid} />) }/>
          </Switch>
        </main>
        </div>
    );
  }
}

export default App;
//https://til.hashrocket.com/posts/z8cimdpghg-passing-props-down-to-react-router-route
