import React, { Component } from 'react';
// import axios from 'axios';
import { Chart } from 'react-google-charts';

//a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.

//TODO: IMPLEMENT THE HISTORICAL DATA 
//TODO: CSS

/*
    Tab displayed in the single company view which displays:
    1. The information summary for the selected company 
    2. A bar chart of the average close price for each month.
*/
class CompanySummarySub extends Component {
    constructor(props){
        super(props);
        this.state ={
            // Setting the state for the company right away passed in from the props of the main container. Since this is the default view we want this information to be displayed right away while the chart loads.
            company : {
                symbol: props.symbol, 
                name:props.name, 
                sector: props.sector, 
                subindustry: props.subindustry, 
                address: props.address, 
                date_added: props.date_added, 
                CIK: props.CIK, 
                frequency: props.frequency
            },
            // options for the graph
            options: {
                title: 'Stock closing summary per month',
                animation:{
                    duration: 1000,
                    easing: 'inAndOut',
                    startup: true,
                    
                },
                is3D: true,
                seriesType: 'bars',
                series: {12: {type: 'line'}},
                vAxis: {title: 'Dollars'},
                hAxis: {title: 'Month'},
                legend: {position: 'top', maxLines: 4},
            },
            // The data for the graph
             data : ([
                 ['Month','Average'],
                 ['Jan',165],
                 ['Feb',135],
                 ['Mar',157],
                 ['Apr',139],
                 ['May',136],
                 ['Jun',136],
                 ['Jul',136],
                 ['Aug',136],
                 ['Sep',136],
                 ['Oct',136],
                 ['Nov',136],
                 ['Dec',136]
              ])
        };
    }
    
    // api call to database gets: *AS*(DYUQ*(YQI(WHDUIWQOHDPOUQHWDHQWWIDHWUIQHDWIQOHDWUIQH)
    componentDidMount(){
        
        //GET THE HISTORICAL DATA FOR THE AVERAGE CLOSE PRICE FOR EACH MONTH 
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
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
      this.setState({ width: window.innerWidth });          
      let options = this.state.options;
      if (window.innerWidth<= 500){
        options.legend = {position: 'top', maxLines: 4}; 
        this.setState({options: options},this.populateGraphDate);
      }else{
        options.legend = {position: 'right'};
        this.setState({options: options}, this.populateGraphDate);
      }
    };

    
    render(){
        if (!this.state.company) {return null;}
            else return (
                <div>
                    <div>{this.state.company.symbol}</div>
                    <div>{this.state.company.name}</div>
                    <div>{this.state.company.sector}</div>
                    <div>{this.state.company.subindustry}</div>
                    <div>{this.state.company.address}</div>
                    <div>{this.state.company.date_added}</div>
                    <div>{this.state.company.CIK}</div>
                    <div>{this.state.company.frequency}</div>
                    <div>
                        {/* Check to make sure the stock closing historical data is loaded and displays upon data load */}
                        {this.state.data?
                        <Chart
                          chartType="ComboChart"
                          data={this.state.data}
                          options={this.state.options}
                          graph_id="ComboChart"
                          width="100%"
                          height="400px"
                        />
                        /* displays nothing if data is not set */
                        :null}
                        
                    </div>
                    
                </div>
            );
           
    }
}
export default CompanySummarySub;