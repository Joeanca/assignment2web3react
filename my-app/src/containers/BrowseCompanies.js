/*Browse Companies. For this view, display a list of companies (and their logos) sorted by name. Each company name will be a link/route to a Single Company view. */

// TODO: Implement api call to new website, SEE IF WE CAN DO IT WITH A DESIGN LAYER!
// TODO: CSS (remove table and implement another type of layout, looks like crad on iPad viewport) and comments

import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';
import jsondata from '../jsonFiles/companies.json';

class BrowseCompanies extends Component {
    constructor(props){
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount(){
        //remove the line below once the api has been implemented!
        this.setState({companies:jsondata.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    
    render(){
        if (! this.state.companies || this.state.companies.length === 0){
            return null;
        }else{
        return(
            <article className="section">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to={"/" }>Home</NavLink></li>
                    <li className="is-active"><span >&nbsp;&nbsp;</span>Companies</li>
                  </ul>
                </nav>
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-narrow-mobile">
                    <tbody>
                        {/* if statement for the displaying of the table of companies. */}
                        {this.state.companies?
                            this.state.companies.map((company, ind) => {
                                return(
                                    <tr key={ind}>
                                    <td>
                                        <NavLink to={"/company/" + company.symbol} company={company} key={ind}>
                                            <div className="card-image box is-marginless column">
                                                <div className="container logo">
                                                    <figure className="image image is-3by2">
                                                        {/* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js */}
                                                      <img src={process.env.PUBLIC_URL + '/logos/'+ company.symbol+ '.svg'} alt={company.symbol} />
                                                    </figure>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </td>
                                    <td><NavLink to={"/company/" + company.symbol} key={ind}>{company.name}</NavLink></td>
                                    </tr>
                                );
                            }):null
                        }
                    </tbody>
                </table>
            </article>
        );}
    }
}
export default BrowseCompanies;