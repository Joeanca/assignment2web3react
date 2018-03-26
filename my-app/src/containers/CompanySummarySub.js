import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

//a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.

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
                symbol: props.symbol
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
                legend: {position: 'none', maxLines: 4},
            },
            months : (['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']),
            // The data for the graph
             data : ''
        };
    }
    
    // api call to database gets: *AS*(DYUQ*(YQI(WHDUIWQOHDPOUQHWDHQWWIDHWUIQHDWIQOHDWUIQH)
    componentDidMount(){
        
        //GET THE HISTORICAL DATA FOR THE AVERAGE CLOSE PRICE FOR EACH MONTH 
        axios.get("https://obscure-temple-42697.herokuapp.com/api/prices/average/" + this.state.company.symbol).then(response => {
            let stateData = [
                 ['Month','Average']];
            for (let i = 0; i<12; i++){
                stateData.push([(this.state.months[i]), Number(response.data[i].closeavg)]);
            }
            this.setState({data:stateData});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
        
        // GET THE SUMMARY INFORMATION FOR THE COMPANY FROM THE SYMBOL
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/" + this.state.company.symbol).then(response => {
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