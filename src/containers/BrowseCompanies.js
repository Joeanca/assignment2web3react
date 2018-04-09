/*Browse Companies. For this view, display a list of companies (and their logos) sorted by name. Each company name will be a link/route to a Single Company view. */
// TODO: CSS (remove table and implement another type of layout, looks like crap on iPad viewport) and comments



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../styles/base/app.scss';


class BrowseCompanies extends Component {
    constructor(props){
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount(){
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list").then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }
    
    
    render(){
        if (! this.state.companies || this.state.companies.length === 0){
            return null;
        }else{
        return(
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to={"/" }>Home</NavLink></li>
                    <li className="is-active"><span >&nbsp;&nbsp;</span>Companies</li>
                  </ul>
                </nav>
                <div className = "card-table">
                    <div className = "content">
                        <div className = "table is-striped is-boardered">
                            <div className = "box tbody panel">
                                {this.state.companies?
                                    this.state.companies.map((company, ind) => {
                                        return (
                                            <div className = "is-fullwidth columns panel-block" key={ind}>
                                                <NavLink to={"/company/" + company.symbol} company={company} key={ind} className = "columns column is-12">
                                                    <div className = "column is-6 is-centered">
                                                        <figure className="image image is-128x128">
                                                            {/* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js */}
                                                          <img src={process.env.PUBLIC_URL + '/logos/'+ company.symbol+ '.svg'} alt={company.symbol} />
                                                        </figure>
                                                    </div>
                                                    <div className = "column is-6">
                                                        <h1>{company.name}</h1>
                                                    </div>
                                                </NavLink>
                                            </div>
                                            
                                        );
                                        
                                    }):null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );}
    }
}
export default BrowseCompanies;