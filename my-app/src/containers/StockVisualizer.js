/* 9.Stock Visualizer. For this view, display a line chart of the close values for a single month for up to three stocks. That is, the x-axis will contain the days, while the y-axis will be money. There should be four drop-down lists: one to select month, the others to select stocks. The drop-down should display symbol and name. Be sure to use different colors for each line. */

import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

// TODO: CSS
// TODO: AXIOS GET PORTFOLIO FOR USER
// TODO: clean fns

//----------------------------------
//Displays a graph containing a chosen single month's historical closing data for up to three stocks. 
//----------------------------------    
class StockVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            userid: this.props.userid,
            // month array which will be used to determine the amount of days in a month and display accurate information
            months:[{num:"01",mon:"January"},{num:"02",mon:"February"}, {num:"03",mon:"March"},{num:"04",mon:"April"},{num:"05",mon:"May"},{num:"06",mon:"June"},{num:"07",mon:"July"},{num:"08",mon:"August"},{num:"09",mon:"September"}, {num:"10" ,mon:"October"}, {num:"11", mon:"November"}, {num:"12", mon:"December"}],
            month:'',
            monthNum:'',
            // COMPANYLIST FILLED ON COMPONENTMOUNT HOLDS THE STOCKS SYMBOL AND NAME TO POPULATE THE DROPDOWNS
            companyList: '',
            displayDropData: false,
            data2:'', data3:'', data4:'',
            
            // OPTIONS FOR THE GRAPH
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
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list/").then(response => {
            // FORMAT OF DATA RETURNED: id:20, owned:364, symbol:"MSFT", user:119, _id:"5aa8738f3b516a49fe08b1b5"
            this.setState({companyList: response.data});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }
    
    //----------------------------------
    // Setting up the functions to be mounted upon right before component mount 
    // attaches a resize listener for the options of the chart legend making it more readable on different viewports
    //----------------------------------
    componentWillMount() {
        // https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
      window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    //----------------------------------
    // Detaching the listener on unmount of the component
    //----------------------------------
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    //----------------------------------
    // Is called on viewport change to change the options of the chart legend making it more readable on different viewports
    //----------------------------------
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
    
    //----------------------------------
    // populates the graph with a customized data format and triggers the plot of the graph
    //----------------------------------
    populateGraphDate= ()=>{
        let dates =[], data = [], daysInMonth,arr1, arr2, arr3, getClose;
        // Check for the selection of the 4 options to graph the historical data. 
        //resets the data state to ensure accurate data is displayed
        this.setState({data:null});
        // gets the number of days in a month for the chosen month 
        daysInMonth = new Date(this.state.monthNum, 2017, 0).getDate();
        for (let i = 1; i<=daysInMonth; i++){
            let currentDay = "2017-"+ this.state.monthNum+"-"+('0' + i).slice(-2);
            dates.push(currentDay);
        }
        //each data check if the stock exists and if it doesnt add a null
        data.push([{"label":"date","type":"string"},{"label":this.state.data2[0].name,"type":"number"},{"label":this.state.data3[0].name,"type":"number"},{"label":this.state.data4[0].name,"type":"number"}]);
        // gets the closing data out of the stock object before pushing to the array of data which will later on become the state.data[]
        getClose = (object)=>{if(object)return object.close; else return null};
        for (let date of dates ){
            // loop through each stock and fill the data array with the points necessary to plot the graph 
            arr1 = this.state.data2.find((data)=>{if(data.name ===  this.state.data2[0].name && data.date.trim() === date){return data}else return null});
            arr2 = this.state.data3.find((data)=>{if(data.name ===  this.state.data3[0].name && data.date.trim() === date){return data}else return null});
            arr3 = this.state.data4.find((data)=>{if(data.name ===  this.state.data4[0].name && data.date.trim() === date){return data}else return null});
            data.push([date,getClose(arr1),getClose(arr2),getClose(arr3)]);
        }
        this.setState({data:data});
        
    }
    
    //----------------------------------
    // called to populate the data array depending on the number of variables selected
    //----------------------------------
    populateDataArrayConditionally=()=>{
        
    }
    
    //----------------------------------
    // called on click on every stock option from the dropdown lists, changes the state of the object passed in and uses a callback to re-populate the graph
    //----------------------------------
    graphTrigger= (dropdownObject, id)=>{
        if (this.state.monthNum){
            let symbol = dropdownObject[id];
            axios.get("https://obscure-temple-42697.herokuapp.com/api/prices/symandmonth/"+symbol+"/"+this.state.monthNum).then(response => {
                // FORMAT OF DATA RETURNED: id:20, owned:364, symbol:"MSFT", user:119, _id:"5aa8738f3b516a49fe08b1b5"
                // this.setState({userPortfolio:response.data});
                let data = ({[id]: response.data});
                let tempName = ""+id+"name";
                // eslint-disable-next-line
                let companyName = this.state.companyList.find((el)=>{if(el.symbol === symbol) return el.name}).name;
                let name = ({[tempName]: companyName});
                this.setState(name);
                this.setState(data, this.populateGraphDate);
            })
            .catch(function (error){
                alert('Error with api call ... error=' + error);
            });
            // this.setState(dropdownObject, this.populateGraphDate);
        }
    }
    
    //----------------------------------
    // Toggles a dropdown on click by using the string passed in as id
    //----------------------------------
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
    
    //----------------------------------
    // Takes the month chosen from the dropdown list and sets the flag displayDropData to allow the stock dropdown lists to appear 
    //----------------------------------
    filterList = (currentmonth)=>{
        this.setState({month:currentmonth.element.month.mon });
        this.setState({monthNum: currentmonth.element.month.num});
        // SET THE AVAILABILITY OF THE ARRAYS OF STOCKS FOR THE THREE STOCK DROPDOWNS
        if (this.state.companyList)
            this.setState({displayDropData: true})
    }
    
    //----------------------------------
    // Programatically creates the dropdowns for the stocks.
    //----------------------------------
    createDropdowns=()=>{
        let elementsToReturn=[];
        for (let i=2; i<5;i++){
            let drop = "data"+i;
            let name = drop+"name";
            elementsToReturn.push(
                <div className="column" key={i}>
                    <div className="dropdown is-fullwidth" id={drop}  onClick={()=>this.toggleDropdown(drop)}>
                            <div className="dropdown-trigger">
                                <button className="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu2">
                                  {/* CHECKS FOR THE STATUS OF THE ARRAY BEING POPULATED, IF IT ISNT DISPLAY CHOOSE A STOCK OTHERWISE DISPLAY THE SYMBOL AND NAME */}
                                  <span className="">{this.state[drop]? "["+this.state[drop][0].name+"] "+ this.state[name]:"Choose a stock"}</span>
                                  <span className="icon is-small is-pulled-right	">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                  </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id={"dropdown-menu"+i} role="menu">
                                <div className="dropdown-content scrollable-menu">
                                {/* THIS CHECKS FOR THE COMPANY LIST ARRAY AND IF POPULATED THEN PROGRAMATICALLY FILLS THE OPTIONS OF THE DROPDOWN */}
                                {this.state.companyList?this.state.companyList.map((stock, ind) => {
                                        return(
                                           <div className="dropdown-item" key={ind} onClick={()=>this.graphTrigger({[drop]:stock.symbol}, drop)}>{"["+stock.symbol+"]" + stock.name}
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
                    {this.state.displayDropData?this.createDropdowns():null}
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