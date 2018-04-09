
//TODO: CSS for the image and the name
//TODO: SORTING

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CompanySummarySub from './CompanySummarySub.js';
import CompanyListSub from './CompanyListSub.js';
import  '../styles/home/home.scss';


//----------------------------------
// For this view, display the logo and the company name. As well, display two tabs that allow the user to view either the Summary sub-view or the List sub-view:
//     a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.
//     b.For the List sub-view, display a drop-down list with the months of the year. When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data. 
//----------------------------------
class SingleCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: this.props.match.params.id,
            defaultTab: true,
            company:''
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        // GET THE SUMMARY INFORMATION FOR THE COMPANY FROM THE SYMBOL AND SETS THE STATE
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/" + this.state.symbol).then(response => {
            let tempData = response.data[0];
            let company = {
                symbol: tempData.symbol,
                name:tempData.name, 
                sector: tempData.sector, 
                subindustry: tempData.subindustry, 
                address: tempData.address, 
                date_added: tempData.date_added, 
                CIK: tempData.CIK, 
                frequency: tempData.frequency
            };
            this.setState({company:company});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }

    //----------------------------------
    // Changes the tab displayed depending on the id passed in upon clicking on the desired tab
    //----------------------------------    
    changeTab = (id)=>{
        if (id === "portfolio") {
            this.setState({defaultTab:false});
            document.querySelector("#details").classList.remove("is-active");
            document.querySelector("#portfolio").classList.add("is-active");
        }
        else {
            this.setState({defaultTab:true});
            document.querySelector("#portfolio").classList.remove("is-active");
            document.querySelector("#details").classList.add("is-active");            
        }
    }
    
    render(){
        if (! this.state.company || this.state.company.length === 0){
            return null;
        }else{
            /* eslint-disable react-in-jsx-scope */
            return(
                <article className="section">
                {/*Bread*/}
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                      <ul>
                        <li><NavLink to={"/" }><span> &nbsp;&nbsp;</span>Home</NavLink></li>
                        <li><NavLink to={"/companies" }>Companies</NavLink></li>
                        <li className="is-active"><span >&nbsp;&nbsp;</span>{this.state.company?this.state.company.name:"loading..."}</li>
                      </ul>
                    </nav>
                    <div className = "card">
                        <div className = "card-image">
                            <div className = "section is-centered">
                                <figure className = "image is-3by2">
                                    {/* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js */}
                                    <img src={process.env.PUBLIC_URL + '/logos/'+ this.state.symbol+ '.svg'} alt={this.state.symbol} />
                                </figure>
                            </div>
                        </div>
                        <div className = "card-content">
                            <div className = "media">
                                <div className = "media-content">
                                    <p className = "title is-1">
                                        {this.state.company.name}
                                    </p>
                                </div>
                            </div>
                            {/* RENDER TABS AND PASS IN PROPS TO THE COMPONENTS WITHIN THE TABS */}
                            <div className="tabs is-boxed is-fullwidth is-marginless">
                                <ul>
                                    <li className="is-active" id="details"><a onClick={()=>this.changeTab("details")} >Summary</a></li>
                                    <li id="portfolio"><a onClick={()=>this.changeTab("portfolio")}>List</a></li>
                                </ul>
                            </div>
                            <div className="box is-radiusless singleUserBox">
                                {this.state.defaultTab? 
                                    // RENDER TAB ACCORDING TO THE STATUS OF THE THIS.STATE.DEFAULTAB
                                    // IF TRUE
                                    <CompanySummarySub symbol={this.state.symbol} company={this.state.company}/>
                                    // IF FALSE
                                    :<CompanyListSub symbol={this.state.symbol} />
                                }
                            </div>
                        </div>
                    </div>
                </article>
            );}
        }
    }
export default SingleCompany;