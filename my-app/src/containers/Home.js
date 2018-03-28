import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            something: []
        };
    }
    render(){
        return(
            <article className="section">
                <NavLink to="/companies" className="button is-primary is-fullwidth" >Companies.</NavLink>
                <NavLink to="/portfolio" className="button is-primary is-fullwidth" >portfolio</NavLink>
                <NavLink to="/login" className="button is-primary is-fullwidth" >Login</NavLink>
                <NavLink to="/company" className="button is-primary is-fullwidth" >Company</NavLink>
                <NavLink to="/visualizer" className="button is-primary is-fullwidth" >Visualizer</NavLink>
                <NavLink to="/aboutus" className="button is-primary is-fullwidth" >About Us</NavLink>
            </article>
        );
    }
}
export default Home;