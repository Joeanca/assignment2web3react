/* 9.Stock Visualizer. For this view, display a line chart of the close values for a single month for up to three stocks. That is, the x-axis will contain the days, while the y-axis will be money. There should be four drop-down lists: one to select month, the others to select stocks. The drop-down should display symbol and name. Be sure to use different colors for each line. */

import React, { Component } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import { Chart } from 'react-google-charts';

//http://recharts.org/#/en-US/examples/LineChartConnectNulls?????
import jsondata from '../jsonFiles/prices.json';

// TODO: CSS
// TODO: AXIOS modify populate graph once is done
// TODO: scrolling dropdowns
// TODO: clean fns
//

/*
    Displays a graph containing a chosen single month's historical closing data for up to three stocks. 
*/
class StockVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // month array which will be used to determine the amount of days in a month and display accurate information
            months:[{num:"01",mon:"January"},{num:"02",mon:"February"}, {num:"03",mon:"March"},{num:"04",mon:"April"},{num:"05",mon:"May"},{num:"06",mon:"June"},{num:"07",mon:"July"},{num:"08",mon:"August"},{num:"09",mon:"September"}, {num:"10" ,mon:"October"}, {num:"11", mon:"November"}, {num:"12", mon:"December"}],
            month:'',
            monthNum:'',
            userPortfolio:[],
            // options for the graph
            options: {
                title: 'Stock close per day of month',
                interpolateNulls: true,
                animation:{
                    duration: 1000,
                    easing: 'inAndOut',
                    startup: true,
                },
                legend: {position: 'top', maxLines: 4},
            },
        };
    }
    
    // api call to database gets: *AS*(DYUQ*(YQI(WHDUIWQOHDPOUQHWDHQWWIDHWUIQHDWIQOHDWUIQH)
    componentDidMount(){
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
        let userPortfolio = jsondata.filter((element)=> element.user === this.state.userid);
        this.setState({userPortfolio:userPortfolio});
    }
    
        // Setting up the functions to be mounted upon right before component mount 
    // attaches a resize listener for the options of the chart legend making it more readable on different viewports
    componentWillMount() {
        // https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
      window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    // Detaching the listener on unmount of the component
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    // Is called on viewport change to change the options of the chart legend making it more readable on different viewports
    handleWindowSizeChange = () => {
      let options = this.state.options;
      if (window.innerWidth<= 768){
        options.legend = {position: 'top', maxLines: 4}; 
        this.setState({options: options},this.populateGraphDate);
      }else{
        options.legend = {position: 'right'};
        this.setState({options: options}, this.populateGraphDate);
      }
    }
    
    // populates the graph with a customized data format and triggers the plot of the graph
    populateGraphDate= ()=>{
        // console.log(this.state.drop2 + this.state.drop3 + this.state.drop4);
        
        // Check for the selection of the 4 options to graph the historical data. 
        if (this.state.drop2 && this.state.drop3 && this.state.drop4){
            //resets the data state to ensure accurate data is displayed
            this.setState({data:null});
            // gets the number of days in a month for the chosen month 
            // let getDaysInMonth = (month,year) =>new Date(year, month, 0).getDate();
            let daysInMonth = new Date(this.state.monthNum, 2017, 0).getDate();
            let dates =[];
            let data = [];
            for (let i = 1; i<=daysInMonth; i++){
                let currentDay = "2017-"+ this.state.monthNum+"-"+('0' + i).slice(-2);
                dates.push(currentDay);
            }
            let filteredStocks = this.state.filteredStocks;
            //each data check if the stock exists and if it doesnt add a null
            let data1, data2, data3;
            // data.push(['date',this.state.drop2, this.state.drop3, this.state.drop4])
            data.push([{"label":"date","type":"string"},{"label":this.state.drop2,"type":"number"},{"label":this.state.drop3,"type":"number"},{"label":this.state.drop4,"type":"number"}]);
            // gets the closing data out of the stock object before pushing to the array of data which will later on become the state.data[]
            let getClose = (object)=>{if(object)return object.close; else return null};
            for (let date of dates ){
                data1 = filteredStocks.find((data)=>{if(data.name ===  this.state.drop2 && data.date.trim() === date){return data}else return null});
                data2 = filteredStocks.find((data)=>{if(data.name ===  this.state.drop3 && data.date.trim() === date){return data}else return null});                
                data3 = filteredStocks.find((data)=>{if(data.name ===  this.state.drop4 && data.date.trim() === date){return data}else return null});
                data.push([date,getClose(data1),getClose(data2),getClose(data3)]);
            }
            // console.log(data);
            // sets the state of data which will trigger the redraw of the graph
            this.setState({data:data});
        }
    }
    
    // called on click on every stock option from the dropdown lists, changes the state of the object passed in and uses a callback to re-populate the graph
    graphTrigger= (dropdownObject)=>{
        this.setState(dropdownObject, this.populateGraphDate);
    }
    
    // Toggles a dropdown on click by using the string passed in as id
    toggleDropdown = (dropMe)=>{
        let drop = document.querySelector("#"+dropMe);
        let expanded = false;
        if (drop.classList.contains('is-active')){
            expanded= true;
        } 
        [].map.call(document.querySelectorAll('.is-active'), function(el) {
            el.classList.remove('is-active');
        });
        this.populateGraphDate();
        if (!expanded)drop.classList.add('is-active');
    }
    
    // Takes the month chosen from the dropdown list and filters the historical data to include only those within the month selected. 
    filterList = (currentmonth)=>{
        this.setState({month:currentmonth.element.month.mon });
        this.setState({monthNum: currentmonth.element.month.num});
        let getWithinMonth = data => {if(data.date >= "2017-"+currentmonth.element.month.num+"-01" && data.date <= "2017-"+currentmonth.element.month.num+"-31"){return data;}};
        let filteredStocks =  [ ...new Set(this.state.userPortfolio.filter(getWithinMonth))];
        this.setState({filteredStocks: filteredStocks});
        let uniqueStocks = [ ...new Set(this.state.userPortfolio.map(name => {return name.name;}))];
        this.setState({uniqueStocks: uniqueStocks}, ()=>this.populateGraphDate());
    }
    
    createDropdowns=()=>{
        let elementsToReturn=[];
        for (let i=2; i<5;i++){
            let drop = "drop"+i;
            elementsToReturn.push(
                <div className="column">
                    <div className="dropdown is-fullwidth" id={drop} key={i} onClick={()=>this.toggleDropdown(drop)}>
                            <div className="dropdown-trigger">
                                <button className="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu2">
                                  <span className="">{this.state[drop]? this.state[drop]:"Choose a stock"}</span>
                                  <span className="icon is-small is-pulled-right	">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                  </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id={"dropdown-menu"+i} role="menu">
                                <div className="dropdown-content scrollable-menu">
                                {this.state.uniqueStocks?
                                    this.state.uniqueStocks.map((stock, ind) => {
                                        return(
                                           <div className="dropdown-item" key={ind} onClick={()=>this.graphTrigger({[drop]:stock})}>{"["+stock+"]" + stock.volume}
                                            </div>
                                        );
                                    }):<div className="dropdown-item" disabled>  First choose a month</div>
                                }
                                </div>
                        </div>
                    </div>
                </div>
            );}
        return elementsToReturn;
    }
    
    render(){
        return(
            <div className="section" id="dropdown_container">
                <div className="columns">
                    <div className="column">
                    <div>
                    <div className="dropdown is-fulwidth is-multiline" id="drop1" onClick={()=>this.toggleDropdown("drop1")}>
                        <div className="dropdown-trigger control has-icon-left">
                            <button className="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu1">
                              <span className="is-fullwidth">{this.state.month?this.state.month:"Choose a month"}</span>
                              <span className="icon is-small is-pulled-right	">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span> 
                            </button>
                            
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu1" role="menu">
                            <div className="dropdown-content">
                            {/* populates the month dropdown with the months of the year */}
                            {this.state.months.map((month, ind) => {
                                    let element = {month: month, drop: "drop1", num: month.num};
                                    return(
                                        <div className="dropdown-item" key={ind} onClick={()=>this.filterList({element})}>{month.mon}
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    {this.createDropdowns()}
                </div>

                <div>
                {/* Check to make sure the data is loaded and displays upon data load/ reload */}
                    {this.state.data?
                    <div>
                        <Chart
                              chartType="LineChart"
                              data={this.state.data}
                              options={this.state.options}
                              graph_id="LineChart"
                              width="100%"
                              height="400px"
                              legend_toggle

                            />
                    </div>
                    : null}
                </div>
                
            </div>
        );
    }
}
export default StockVisualizer;