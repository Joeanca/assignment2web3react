//    a.For the List sub-view, display the user’s portfolio information (i.e., the stock symbol, the company name, the number owned, and the current value) in a list. Just like in the first assignment, the user should be able to change the sort order by clicking on the column headings; repeated clicking will toggle between ascending and descending. The symbol and the name will be link/routes to Single Company view. For the current value, it is latest price * number owned.

// TODO CSS
import React, { Component } from 'react';
import axios from 'axios';

//----------------------------------
//  This class displays the info tab which is rendered on the browse portfolio page 
//  displays the stock owned by the client and the average close price for each month
//----------------------------------    
class PortfolioInfoSub extends Component {
    constructor(props){
        super(props);
        this.state={
            userid: this.props.userid,
            userPortfolio: this.props.portfolio,
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        let userPortfolio= this.state.userPortfolio;
        let portfolioWithName = [];
        // GETS THE SUMMARY OF STOCKS OWNED AND DISPLAYS AS A PERCENTAGE
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list").then(response => {
            response.data.filter(function(element) {
              for(let el of userPortfolio){if (el.symbol === element.symbol){
                  let toReturn ={owned:el.owned, symbol: element.symbol, name: element.name};
                  portfolioWithName.push(toReturn);
                  }}return null;
            });
            this.setState({userPortfolio: portfolioWithName});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }
    render(){
        // Checks if the the information for the database api call has been successfully retrieved and displays result 
        if (!this.state.userPortfolio) {return null;}
            else return (
                <table>
                    <tbody>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Owned</th>
                    </tr>
                    {/* maps the user portfolio data to display the information for each of the stocks retrieved */}
                    {this.state.userPortfolio.map((stock, ind) => {
                        return(
                            <tr key={ind}>
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td>{stock.owned}</td>
                            </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            );
    }
}
export default PortfolioInfoSub;
