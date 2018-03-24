//    a.For the List sub-view, display the user’s portfolio information (i.e., the stock symbol, the company name, the number owned, and the current value) in a list. Just like in the first assignment, the user should be able to change the sort order by clicking on the column headings; repeated clicking will toggle between ascending and descending. The symbol and the name will be link/routes to Single Company view. For the current value, it is latest price * number owned.

import React, { Component } from 'react';
// import axios from 'axios';
// import {BarChart} from 'react-easy-chart';

import jsondata from '../jsonFiles/portfolio.json';

/* 
    This class displays the info tab which is rendered on the browse portfolio page 
    displays the stock owned by the client and the average close price for each month
*/
class PortfolioInfoSub extends Component {
    constructor(props){
        super(props);
        this.state={
            company: "hello",
            userid: this.props.userid

        }
    }
    
    /* Once the component mounts fetch the information from the database api */
    componentDidMount(){
        let userPortfolio = jsondata.filter((element)=> element.user === this.state.userid);
        // console.log(userPortfolio);
        this.setState({userPortfolio:userPortfolio});
        
        //GET THE HISTORICAL DATA FOR THE AVERAGE CLOSE PRICE FOR EACH MONTH 
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    render(){
        // Checks if the the information for the database api call has been successfully retrieved and displays result 
        if (!this.state.userPortfolio) {return null;}
            else return (
                <div>
                    {/* maps the user portfolio data to display the information for each of the stocks retrieved */}
                    {
                            this.state.userPortfolio.map((stock, ind) => {
                                return(
                                    <div key={ind}>
                                        <div>{stock.symbol}</div>
                                        <div>{stock.owned}</div>
                                    </div>
                                );
                            })
                    }
                </div>
            );
           
    }
}
export default PortfolioInfoSub;
