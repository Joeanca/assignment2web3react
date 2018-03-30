import React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //This state property is the handler for the burger menu displayed only in mobile form
            showMenu: false,
            // states available through user: id, first_name, last_name, email
            user: this.props.user,
            logout: this.props.logoutfn
        };
    }
    // Displays the desktop menu onMouseIn
    triggerMenu = ()=>{
       document.querySelector('#mainMenu').classList.add("is-active");
    }
    // Removes the desktop menu onMouseOut
    removeMenu = ()=>{
       document.querySelector('#mainMenu').classList.remove("is-active");

    }
    //Toggles the burger menu on mobile and on click of a menu item
    toggleMenu = ()=>{
        if (this.state.showMenu){
            this.setState({showMenu:false})
        }else{
            this.setState({showMenu:true})
        }
        document.querySelector('#navBurger').classList.toggle("is-active");
        document.querySelector('.navbar-menu').classList.toggle("is-active");
    }

    render(){
        return(
        <nav className="navbar is-primary"> 
            <div className="navbar-brand">
                <a className="navbar-item">
                    <span className="icon">      
                        <i className="fab fa-lg fa-react"></i>       
                    </span>                 
                </a>                
                <NavLink className="navbar-item" to={ {pathname: "/home" }}>                   
                        <h1 className="title is-3">Welcome: {this.state.user.first_name} {this.state.user.last_name}</h1>
                </NavLink>
                
                {/* empty container found to be needed as a place holder for the burger meny contracted*/}
                <a className=" navbar-burger" id="navBurger" onClick={this.toggleMenu}>
                     <span></span>
                     <span></span>
                     <span></span>
                </a>
            </div>
            
            {/* Contracted burger menu at start */}
            <div className="navbar-menu  navbar-dropdown">
                <div className="navbar-end">
                     <NavLink className="navbar-item" to={ {pathname: "/companies" }} onClick={this.toggleMenu} >
                        <div className="">Companies</div>
                        <div>Browse the companies in our system</div>
                     </NavLink>
                    <hr />
                     <NavLink className="navbar-item" to={ {pathname: "/portfolio" }} onClick={this.toggleMenu}>
                        <div>Portfolio</div>
                        <div>Browse your portfolio</div>
                     </NavLink>
                     <hr />
                     <NavLink className="navbar-item" to={ {pathname: "/visualizer" }} onClick={this.toggleMenu}>
                        <div>Stock Visualizer</div>
                        <div>Interactive stock information</div>
                     </NavLink>
                     <hr />
                     <NavLink className="navbar-item" to={ {pathname: "/aboutus" }} onClick={this.toggleMenu}>
                        <div>About Us</div>
                        <div>Find out more about this system</div>
                      <hr className="dropdown-divider"/>

                     </NavLink>
                     <NavLink className="navbar-item"  to={ {pathname: "/" }} onClick={this.state.logout}>
                        <div>Logout</div>
                     </NavLink>
                </div>
            </div>
            {/* Desktop menu, not visible on mobile*/}
            <div className="navbar-end is-hidden-touch" id="desktop-menu" >
            <div id="mainMenu" className="dropdown is-right  is-fullheight" onMouseOver ={()=> this.triggerMenu()} onMouseOut={()=>this.removeMenu()}>
              <div className="dropdown-trigger" >
                <button className="button is-primary  is-fullheight" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Menu</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <NavLink to={ {pathname: "/companies" }} className="dropdown-item">
                    <div className="">Companies</div>
                    <div>Browse the companies in our system</div>
                  </NavLink>
                  <hr className="dropdown-divider"/>
                  <NavLink to={ {pathname: "/portfolio" }} className="dropdown-item">
                    <div>Portfolio</div>
                    <div>Browse your portfolio</div>
                  </NavLink>
                  <hr className="dropdown-divider"/>
                  <NavLink to={ {pathname: "/visualizer" }} className="dropdown-item">
                    <div>Stock Visualizer</div>
                    <div>Interactive stock information</div>
                  </NavLink>
                  <hr className="dropdown-divider"/>
                  <NavLink to={ {pathname: "/aboutus" }} className="dropdown-item is-info is-hovered">
                    <div>About Us</div>
                    <div>Find out more about this system</div>
                  </NavLink>
                    <hr className="dropdown-divider"/>
                    <NavLink className="navbar-item" to={ {pathname: "/" }} onClick={this.state.logout}>
                        <div>Logout</div>
                     </NavLink>
                </div>
              </div>
            </div>
            </div>
           
        </nav>     

        );
    }
}
export default HeaderBar;