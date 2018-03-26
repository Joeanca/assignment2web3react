//b.For the Summary sub-view (which should be the default), display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user (see 2a in Back-End Requirements). */

//TODO total amount of money
//TODO CSS

import React, { Component } from 'react';
import { Chart } from 'react-google-charts';


class PortfolioSummarySub extends Component {
    constructor(props){
        super(props);
        this.state={
            owned:'',
            userid: this.props.userid,
            pieData: this.props.pieData,
            options: {
                title: 'Portfolio distribution',
                animation:{
                    duration: 1000,
                    easing: 'inAndOut',
                    startup: true,
                },
                is3D: true,
                legend: {position: 'top', maxLines: 4},
            }
        };
    }
    componentDidMount(){
        this.setState({owned: (this.state.pieData.length-1)})
    }
    componentWillMount() {
        // https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });          
      let options = this.state.options;
      if (window.innerWidth<= 500){
        options.legend = {position: 'top', maxLines: 4}; 
        this.setState({options: options});
      }else{
        options.legend = {position: 'right'};
        this.setState({options: options});
      }
    };

        
    render(){
        
        if (!this.state.pieData) {return null;}
            else return (
                <div className="section">
                    <div>Total number of companies owned: {this.state.owned}</div>
                    <div>
                        <Chart
                          chartType="PieChart"
                          data={this.state.pieData}
                          options={this.state.options}
                          graph_id="PieChart"
                          width="100%"
                          height="400px"
                          legend_toggle
                        />
                    </div>
                    <div>{this.props.params}</div>
                </div>
            );
           
    }
}
export default PortfolioSummarySub;
