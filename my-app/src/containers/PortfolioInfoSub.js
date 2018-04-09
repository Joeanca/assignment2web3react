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
            completePortfolio:'',
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
            let userPortfolio= this.state.userPortfolio;
            let portfolioWithName = [];
            let porfolioComplete = [];

            // GETS THE SUMMARY OF STOCKS OWNED AND DISPLAYS AS A PERCENTAGE
            axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list").then(response => {
                response.data.filter((element)=> {
                  for(let el of userPortfolio){if (el.symbol === element.symbol){
                      let toReturn ={owned:el.owned, symbol: element.symbol, name: element.name};
                      portfolioWithName.push(toReturn);
                      }}return null;
                });
               this.setState({completePortfolio: portfolioWithName}, getPrices());

            })
            .catch(function (error){
                alert('Error with api call ... error=' + error);
            });
            // eslint-disable-next-line
            let getPrices =()=>{
            portfolioWithName.map(el=>{
                    axios("https://obscure-temple-42697.herokuapp.com/api/prices/latest/"+ el.symbol).then(response => {
                        let newEl = el;
                        newEl.close = response.data.close;
                        porfolioComplete.push(newEl);
                })
                .catch(function (error){
                    alert('Error with api call ... error=' + error);
                })});
            console.log(porfolioComplete);
            this.setState({porComplete:porfolioComplete},this.render());
            }
            
        
    }

    sort=(id)=>{
        let porfolioComplete = this.state.porComplete;
        if (document.querySelector("#"+ id).classList.contains(".desc")){
            porfolioComplete.sort((a, b)=>{let result =0;if (a[id] <b[id])result=1;else if(b[id]<a[id])result=-1;return result;});
            this.setState({porfolioComplete:porfolioComplete});
            document.querySelector("#"+ id).classList.remove(".desc");
            document.querySelector("#"+ id).classList.add(".asc");
        }else{
            porfolioComplete.sort((a, b)=>{let result =0;if (a[id] <b[id])result=-1;else if(b[id]<a[id])result=1;return result;});
            this.setState({porfolioComplete:porfolioComplete});
            document.querySelector("#"+ id).classList.add(".desc");
            document.querySelector("#"+ id).classList.remove(".asc");
        }
    }
    render(){
        // Checks if the the information for the database api call has been successfully retrieved and displays result 
        if (!this.state.porComplete) {return null;}
            else return (
                <table className = "table is-striped">
                    <thead>
                        <tr>
                            <th id="symbol" onClick={()=>this.sort("symbol")}>Symbol</th>
                            <th id="name" onClick={()=>this.sort("name")}>Name</th>
                            <th id="owned" onClick={()=>this.sort("owned")}>Owned</th>
                            <th id="close" onClick={()=>this.sort("close")}>Current price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* maps the user portfolio data to display the information for each of the stocks retrieved */}
                    {this.state.porComplete.map((stock, ind) => {
                        return(
                            <tr key={ind}>
                                <td>{stock.symbol}</td>
                                <td >{stock.name}</td>
                                <td>{stock.owned}</td>
                                <td>${stock.close}</td>

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
