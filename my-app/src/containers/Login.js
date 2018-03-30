/* 4.The first thing the user must experience is a log-in screen if the user is not already logged-in. The form must provide mechanism for entering email and password. It will display a Bulma notification if the credential information is incorrect. This notification must disappear once the user starts entering information into the login form. I would recommend adding in the log-in capabilities after you have most of the main functionality working. I will provide you with more guidance on how best to implement this in Node and react. */

import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import axios from 'axios';
// import { NavLink } from 'react-router-dom';

//TODO : email format validation
//TODO : password hashing and communication



// EXAMPLE OF LOGIN
// https://reacttraining.com/react-router/web/example/auth-workflow
//https://tylermcginnis.com/react-router-protected-routes-authentication/



//-----------------------------------------------------
//
//-----------------------------------------------------
class Login extends Component {
  constructor(props){
        super(props);
        this.state={
            userid: this.props.userid,
            auth: this.props.changeAuth,
            isAuthenticated: this.props.isAuthenticated,
            redirectToReferrer: '',
            smtgWrong: false
        };
    }

  //-----------------------------------------------------
  //
  //-----------------------------------------------------
  bypasslogin = () => {
     let setpswd =()=>{this.setState({pswd: "funwebdev" },this.login)};
      this.setState({email: "ccrigin3@nbcnews.com" },setpswd);
  };

  //-----------------------------------------------------
  //
  //-----------------------------------------------------
  componentDidMount=()=>{
      this.setState({tempemail: "ccrigin3@nbcnews.com" });
      this.setState({temppswd: "funwebdev" });

  }
  
  //-----------------------------------------------------
  //
  //-----------------------------------------------------
  login = () => {
      if (this.state.email && this.state.pswd){
      axios({
          method: 'post',
          url: "https://obscure-temple-42697.herokuapp.com/api/user/",
          data: {
                    "email": this.state.email,
                    "password": this.state.pswd
                }
        }).then(response => {
            if (!response.data.message){
                  let user = response.data[0];
                  this.props.auth(true, user);
            }else this.displayDivError("Please check your credentials and try again");
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });   
      }else{
          this.setState({smtgWrong: true});
      }
      

  };
  
  //-----------------------------------------------------
  //
  //-----------------------------------------------------
  handleOnChange = ( el ) => {
      if (el.target.id === "email"){
      this.setState({tempemail:el.target.value});
      let re =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (re.test(el.target.value)) {
        document.querySelector("#email").classList.remove("is-danger");
        this.setState({email: [el.target.value]})
        this.setState({smtgWrong: false});
      }
      else {
          document.querySelector("#email").classList.add("is-danger");
      }
      }
      if (el.target.id === "pswd"){
            this.setState({temppswd: [el.target.value]});
          if (el.target.value.length > 6){
            document.querySelector("#pswd").classList.remove("is-danger");
                this.setState({pswd: [el.target.value]})

          }else {
            document.querySelector("#pswd").classList.add("is-danger");
      }
    }
  }
  
  displayDivError=(mssg)=>{
      this.setState({smtgWrong: true});
      document.querySelector("#error").innerHTML = mssg;
  }
  
  render() {
    const { from } = this.props.location.pathname|| { from: { pathname: "/" } };
    if (this.state.redirectToReferrer) {
      return <Redirect  to={{pathname: {from} }}/>;
    }
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
                                {this.state.smtgWrong?<div id="error" className="has-text-danger">Something went wrong. Make sure your email is formatted as someone@somewhere.com and your password is at least 8 digits long</div>:null}
                                <div className="field">
                                  <label className="label">Email</label>
                                  <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="email" id="email" placeholder="Email input"  onChange={this.handleOnChange}/>
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
                                    <input className="input" id="pswd" type="password" placeholder="Password"  onChange={this.handleOnChange}/>
                                    <span className="icon is-small is-left" >
                                      <i className="fas fa-lock"></i>
                                    </span>
                                  </p>
                                </div>
                                {/* TO DISABLE LOGIN REDIRECT ON LOAD SET THE APP.JS ISAUTHENTICATED STATE TO TRUE */}
                                <div className="field is-grouped">
                                      <p className="control">
                                        <a className="button is-link input" onClick={()=>this.bypasslogin()}>
                                          <span>Login with the ccrigin3@nbcnews.com credentials "debug"</span>
                                        </a>
                                      </p>
                                      <p className="control">
                                        <a className="button is-link input" onClick={()=>this.login()}>
                                          <span>Submit</span>
                                        </a>
                                      </p>
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
