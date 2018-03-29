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
                <NavLink to="/portfolio" className="button is-primary is-fullwidth" >portfolio.</NavLink>
                <NavLink to="/login" className="button is-primary is-fullwidth" >login.</NavLink>
                <NavLink to="/company" className="button is-primary is-fullwidth" >company.</NavLink>
                <NavLink to="/visualizer" className="button is-primary is-fullwidth" >visualizer.</NavLink>
                <NavLink to="/aboutus" className="button is-primary is-fullwidth" >aboutus.</NavLink>
            </article>
        );
    }
}
export default Home;