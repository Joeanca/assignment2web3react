/* 4.The first thing the user must experience is a log-in screen if the user is not already logged-in. The form must provide mechanism for entering email and password. It will display a Bulma notification if the credential information is incorrect. This notification must disappear once the user starts entering information into the login form. I would recommend adding in the log-in capabilities after you have most of the main functionality working. I will provide you with more guidance on how best to implement this in Node and react. */

import React, { Component } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';

//TODO : email format validation
//TODO : password hashing and communication



// EXAMPLE OF LOGIN
// https://reacttraining.com/react-router/web/example/auth-workflow


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          redirectToReferrer: false
        };
    }
    
    handleChange= (event)=> {
        this.setState({value: event.target.value});
    }

    
    render(){
        return(
          <div>
            
            <article className="section">
            {/* https://pixabay.com/en/coins-currency-investment-insurance-948603/ */}
                <div>
                    <div className ="card">
                        <figure className="card-image section is-hidden-desktop">
                            <p className="content image is-2by1"> 
                            {/* image retrieved from https://seraf-investor.com/ */}
                              <img src={process.env.PUBLIC_URL + '/images/portinvestment.svg'} alt="logo"/>
                            </p>
                        </figure>
                    
                        <figure className="card-image section is-hidden-touch level-item has-text-centered">
                            <p className="content image is-128x128"> 
                            {/* image retrieved from https://seraf-investor.com/ */}
                              <img src={process.env.PUBLIC_URL + '/images/portinvestment.svg'} alt="logo"/>
                            </p>
                        </figure>
                        <form className ="control card-content">
                            <div className= "card-content">
                                <div className="field">
                                  <label className="label">Email</label>
                                  <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="email" placeholder="Email input" value="hello@" onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                      <i className="fas fa-envelope"></i>
                                    </span>
                                    <span className="icon is-small is-right is-hidden">
                                      <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                  </div>
                                  <p className="help is-danger is-hidden">This email is invalid</p>
                                </div>
                                <div className="field">
                                  <p className="control has-icons-left">
                                    <input className="input" type="password" placeholder="Password"/>
                                    <span className="icon is-small is-left" >
                                      <i className="fas fa-lock"></i>
                                    </span>
                                  </p>
                                </div>
                                <div className="field is-grouped">
                                  <div className="control">
                                    <button className="button is-link input"  type="submit" value="Submit" >Submit</button>
                                  </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
          </div>
        );
    }
}
export default Login;