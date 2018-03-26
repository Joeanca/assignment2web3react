/*Single Company. For this view, display the logo and the company name. As well, display two tabs that allow the user to view either the Summary sub-view or the List sub-view. 

    a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.
    
    b.For the List sub-view, display a drop-down list with the months of the year. When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data. */


//TODO: CSS for the image and the name
import React, { Component } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import CompanySummarySub from './CompanySummarySub.js';
import CompanyListSub from './CompanyListSub.js';

import jsondata from '../jsonFiles/companies.json';


class SingleCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: props.match.params.id,
            defaultTab: true,
            company:''
        };
    }
    
    componentDidMount(){
        //remove the line below once the api has been implemented!
        this.setState({company:jsondata.find(data=>data.symbol === this.state.symbol)});
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    changeTab = ()=>{
        if (this.state.defaultTab) {
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
        return(
            <article className="section">
                <div className="card-image box is-marginless column">
                    <div className="container logo">
                        <figure className="image image is-3by2">
                            {/* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js */}
                          <img src={process.env.PUBLIC_URL + '/logos/'+ this.state.symbol+ '.svg'} alt={this.state.symbol} />
                        </figure>
                        <div>{this.state.company.name}</div>
                        
                    </div>
                </div>
                {/* Render tabs and pass in props*/}
                <div className="tabs is-boxed is-fullwidth is-marginless">
                    <ul>
                        <li className="is-active" id="details"><a onClick={this.changeTab} >Summary</a></li>
                        <li id="portfolio"><a onClick={this.changeTab}>List</a></li>
                    </ul>
                </div>
                <div className="box is-radiusless singleUserBox">
                    {this.state.defaultTab? 
                        <CompanySummarySub symbol={this.state.symbol} />
                        :<CompanyListSub symbol={this.state.symbol} />
                    }
                </div>
            </article>
        );}
    }
}
export default SingleCompany;