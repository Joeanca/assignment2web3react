/*  8.Browse Portfolio. For this view, use tabs that allow the user to view either the Summary sub-view or the List sub-view. 

    a.For the List sub-view, display the user’s portfolio information (i.e., the stock symbol, the company name, the number owned, and the current value) in a list. Just like in the first assignment, the user should be able to change the sort order by clicking on the column headings; repeated clicking will toggle between ascending and descending. The symbol and the name will be link/routes to Single Company view. For the current value, it is latest price * number owned.

    b.For the Summary sub-view (which should be the default), display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user (see 2a in Back-End Requirements). */
    
import React, { Component } from 'react';
import PortfolioSummarySub from './PortfolioSummarySub.js';
import PortfolioInfoSub from './PortfolioInfoSub.js';

class BrowsePortfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultTab: true,
            userid: 118
        }
    }
    
    changeTab = ()=>{
        if (this.state.defaultTab) {
            this.setState({defaultTab:false});
            document.querySelector("#summary").classList.remove("is-active");
            document.querySelector("#info").classList.add("is-active");
        }
        else {
            this.setState({defaultTab:true});
            document.querySelector("#info").classList.remove("is-active");
            document.querySelector("#summary").classList.add("is-active");            
        }
    }
    
    render(){
        return(
            <article className="section">
                {/* Render tabs and pass in props*/}
                <div className="tabs is-boxed is-fullwidth is-marginless">
                    <ul>
                        <li className="is-active" id="summary"><a onClick={this.changeTab} >Your portfolio summary</a></li>
                        <li id="info"><a onClick={this.changeTab}>Your portfolio information</a></li>
                    </ul>
                </div>
                <div className="box is-radiusless singleUserBox">
                    {this.state.defaultTab? 
                        <PortfolioSummarySub userid={this.state.userid}/>
                        :<PortfolioInfoSub userid={this.state.userid}/>
                    }
                </div>
            </article>
        );
    }
}
export default BrowsePortfolio;