// b.For the List sub-view, display a drop-down list with the months of the year. When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data. */

// TODO: display a table with the price information (date, low, high, close) for each day of the month that has data.

import React, { Component } from 'react';

// Displays the information for a single stock element
class CompanyListSub extends Component{
    constructor(props){
        super(props);
        this.state ={
            months:["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            month:''
        };
    }
    componentDidMount(){
        //When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data.
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    
    }
    toggleDropdown = (dropMe)=>{
        let drop = document.querySelector("#"+dropMe);
        drop.classList.toggle("is-active");
    
        // let active = document.querySelectorAll('.dropdown.is-active');
        // function x(){
        //   for (var i = 0; i < active.length; i++) {
        //     active[i].classList.remove('is-active');
        //   }
        // }
        // x();
    }
    
    filterList = (currentmonth)=>{
        this.setState({month: currentmonth.month});
    }
    render(){
        return(
            <div className="section" id="dropdown_container">
                <div className="dropdown" id="drop1" onClick={()=>this.toggleDropdown("drop1")}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu1">
                          <span>{this.state.month?this.state.month:"Choose a month"}</span>
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu1" role="menu">
                        <div className="dropdown-content">
                        {
                            this.state.months.map((month, ind) => {
                                return(
                                    <div className="dropdown-item" key={ind} onClick={()=>this.filterList({month})}>{month}
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}
export default CompanyListSub;