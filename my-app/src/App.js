import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom';
import './App.css';
import socketClient from './chatserver/SocketClient.js'

import HeaderBar from './components/HeaderBar.js';
import Home from './containers/Home.js';
import BrowseCompanies from './containers/BrowseCompanies.js';
import BrowsePortfolio from './containers/BrowsePortfolio';
import Login from './containers/Login.js';
import SingleCompany from './containers/SingleCompany';
import StockVisualizer from './containers/StockVisualizer';
import NotFound from './components/NotFound.js';
import AboutUs from './components/AboutUs.js';
import Notification from './containers/notification.js';
import Chat from './chatserver/ChatWindow.js';

//-----------------------------------------------------
// ROOT ELEMENT FOR THE APP, REDIRECTS TO LOGIN IF THE FLAG ISAUTHENTICATED IS FALSE
//-----------------------------------------------------
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          userid:-1,
          isAuthenticated : false,
          startNoLogin: true, 
          client: socketClient()
        };
    }
    
    //-----------------------------------------------------
    // FUNCTION PASSED INTO THE LOGIN.JS ALLOWING THE CHANGE IN STATE WHICH HELPS TO REDIRECT TO THE REQUESTED PAGE.
    //-----------------------------------------------------
    changeAuth=(bool, user)=>{
        if (user){
          this.setState({userid:user.id});
          this.setState({first:user.first_name});
          this.setState({last: user.last_name});
          this.setState({wholeUser: user})
        }
        this.setState({isAuthenticated :true});
    }
    
    //-----------------------------------------------------
    // USES THE ISAUTHENTICATED FLAG TO PROMPT THE APP TO REDIRECT TO THE LOGIN ON FALSE
    //-----------------------------------------------------
    logout=()=>{
        this.setState({isAuthenticated: false});
    }
   
    //-----------------------------------------------------
    // CALL ON ROUTE RENDER FROM THE APP.JS RENDER FUNCTION, IF TRUE IT RETURNS A PASSED IN COMPONENT WITH ITS RESPECTIVE PROPS. OTHERWISE IT CALLS THE REDIRECT FUNCTION TO RENDER THE LOGIN
    //----------------------------------------------------- 
    checkAuth=(component)=>{
      if (this.state.isAuthenticated){
        return component
      }else {
        return this.redirect(component)
      }
    }
   
    //-----------------------------------------------------
    // CALLED BY CHECKAUTH IF ISAUTHENTICATED IS FALSE. REDIRECTS TO THE LOGIN SCREEN 
    //-----------------------------------------------------
    redirect=({ component: Component, ...rest }) => (<Route {...rest} render={props => (<Login to={{pathname: "/login",state: { from: props.location }}} auth={this.changeAuth} startNoLogin={this.state.startNoLogin}{...props} />) } />)
   
   
   render() {
    return (
      <div>
        {/* checks if logged in and passes the user data */}
        {this.state.isAuthenticated?<HeaderBar logoutfn={this.logout} user={this.state.wholeUser}/>:
           null
        }
        <main >
          <Switch >
            <Route path="/" exact render={(props) => (this.checkAuth(<Home userid={this.state.userid} />))} />
            <Route path="/home" exact render={(props) => this.checkAuth(<Home userid={this.state.userid} />) }/>
            <Route path="/companies" exact render={(props) => this.checkAuth(<BrowseCompanies userid={this.state.userid}  />)}/>
            <Route path="/portfolio" exact render={(props) => this.checkAuth(<BrowsePortfolio userid={this.state.userid}  />) }/>
            <Route path="/login" exact render={(props) => (<Login auth={this.changeAuth} history={this.history} from={props.location} />) }/>
            <Route path="/company/:id" exact render={(props) => this.checkAuth(<SingleCompany {...props} userid={this.state.userid} />) }/>
            <Route path="/visualizer" exact render={(props) => this.checkAuth(<StockVisualizer  userid={this.state.userid} />) }/>
            <Route path="/aboutus" exact render={(props) => this.checkAuth(<AboutUs userid={this.state.userid} />) }/>
            <Route path="/notification" exact render={(props) => this.checkAuth(<Notification userid={this.state.userid} user={this.state.wholeUser}/>) }/>
            
            <Route path="/chat" exact render={(props) => 
              this.checkAuth(<Chat userid={this.state.userid} 
                  user={this.state.wholeUser} 
                  chatHistory={[]} 
                  onSendMessage={(message) => this.state.client.message(message)}
                  registerHandler={this.state.client.registerHandler}
                  unregisterHandler={this.state.client.unregisterHandler}
                  client={this.state.client}
                />) 
              }
            />

            <Route render={(props) => this.checkAuth(<NotFound userid={this.state.userid} />) }/>
          </Switch>
        </main>
        </div>
    );
  }
}

export default App;
//https://til.hashrocket.com/posts/z8cimdpghg-passing-props-down-to-react-router-route
