import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../styles/home/home.scss';


class Home extends Component {
   constructor(props){
        super(props);
        this.state={
            userid: this.props.userid,
        };
    }
     
    render(){
        return(
            <div>
                <div className = "columns">
                    <div className = "column is-4">
                        {/*Card for Companies*/}
                        <div className = "card">
                            <figure className = "image is-3by3">
                                <img src = "http://placeimg.com/640/480/arch" alt = "Companies" />
                            </figure>
                            <div className = "card-content">
                                <div className = "media">
                                    <div className = "media-content">
                                        <br/>
                                        <NavLink to="/companies" className="button is-primary is-fullwidth" >Companies</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "column is-4">
                        {/*Card for Portfolios*/}
                        <div className = "card">
                            <figure className = "image is-3by3">
                                <img src = "http://placeimg.com/640/480/tech" alt = "Portfolios" />
                            </figure>
                            <div className = "card-content">
                                <div className = "media">
                                    <div className = "media-content">
                                        <br/>
                                        <NavLink to="/portfolio" className="button is-primary is-fullwidth" >Portfolio</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "column is-4">
                        {/*Card for Login*/}
                        <div className = "card">
                            <figure className = "image is-3by3">
                                <img src = "http://placeimg.com/640/480/arch" alt = "Login" />
                            </figure>
                            <div className = "card-content">
                                <div className = "media">
                                    <div className = "media-content">
                                        <br/>
                                        <NavLink to="/login" className="button is-primary is-fullwidth" >Login</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "columns is-multiline">
                    <div className = "column is-4">
                        {/*Card for Company*/}
                        <div className = "card">
                            <figure className = "image is-3by3">
                                <img src = "http://placeimg.com/640/480/tech" alt = "Company" />
                            </figure>
                            <div className = "card-content">
                                <div className = "media">
                                    <div className = "media-content">
                                        <br/>
                                        <NavLink to="/company" className="button is-primary is-fullwidth" >Company</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "column is-4">
                        {/*Card for Visualizer*/}
                        <div className = "card">
                            <figure className = "image is-3by3">
                                <img src = "http://placeimg.com/640/480/arch" alt = "Visualizer" />
                            </figure>
                            <div className = "card-content">
                                <div className = "media">
                                    <div className = "media-content">
                                        <br/>
                                        <NavLink to="/visualizer" className="button is-primary is-fullwidth" >Visualizer</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "column is-4">
                        {/*Card for About Us*/}
                        <div className = "card">
                            <figure className = "image is-3by3">
                                <img src = "http://placeimg.com/640/480/tech" alt = "About Us" />
                            </figure>
                            <div className = "card-content">
                                <div className = "media">
                                    <div className = "media-content">
                                        <br/>
                                        <NavLink to="/aboutus" className="button is-primary is-fullwidth" >About Us</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Home;