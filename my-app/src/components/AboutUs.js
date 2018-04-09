/* 10.About Us. For this view, list each person in group and their contributions. Provide link to your GitHub repo. Also provide links and info about all third-party libraries used. As well, be sure to provide summary of all the tools and anything else that a future potential employer or client would be interested in knowing about. That is, use this About Us as a way to sell your skills and knowledge to potential clients/employers. */

import React from 'react';
import { NavLink } from 'react-router-dom';

//Simple about us container page
const AboutUs=()=> {
  return (
    <div className="section">
      <nav className="breadcrumb is-12" aria-label="breadcrumbs">
        <ul>
          <li><NavLink to={"/" }>Home</NavLink></li>
            <li className="is-active"><span >&nbsp;&nbsp;</span>About Us</li>
        </ul>
      </nav>
      {/*https://bulma.io/documentation/components/card/ */}
      <div className="columns">
        <div className="card column">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 is-marginless">
                  Catie Vickers
                </p>
                <p className="subtitle is-6 is-marginless">
                  SASS/SCSS, Color palette generation, & design
                </p>
                <p className="title is-4 is-marginless">
                  Jorge Castano
                </p>
                <p className="subtitle is-6 is-marginless">
                  React & Google Charts
                </p>
                <p className="title is-4 is-marginless">
                  Brandon Cochrane
                </p>
                <p className="subtitle is-6 is-marginless">
                  Dev OPs, chat, & notifications
                </p>
                <p className="title is-4 is-marginless">
                  George Chase
                </p>
                <p className="subtitle is-6 is-marginless">
                  API, CSS, grade-a bitch fixer
                </p>
              </div>
            </div>
            <div className="content">
              We are students in the Bachelor of Computer Information Systems at Mount Royal University. While we are sad that this is our last Web assignment, we are also so excited cause this one was a bitch. 
              <br />
              <br />
              <a href="https://twitter.com/hashtag/css">#css</a>
              <a href="https://twitter.com/hashtag/responsive">#responsive</a>
              <a href="https://twitter.com/hashtag/react">#react</a>
              <a href="https://twitter.com/hashtag/node">#node</a>
              <a href="https://twitter.com/hashtag/heroku">#heroku</a>
              <a href="https://twitter.com/hashtag/bulma">#bulma</a>
              <a href="https://twitter.com/hashtag/sass">#sass</a>
              <a href="https://twitter.com/hashtag/googleanalytics">#googleanalytics</a>
              <a href="https://twitter.com/hashtag/c9">#c9</a>
            </div>
          </div>
        </div>
        <nav className=" card panel column message is-info is-radiusless">
          <p className="panel-heading is-info">
            Tools and websites used:
          </p>
          <div className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-ambulance"></i>
            </span>
            <span>
              <a href="http://www.stackoverflow.com" > stackoverflow</a>
                <span> 
                  &nbsp;<small>  (comments in code with specific pages)</small>
                </span>
            </span>
          </div>
                    <a href="http://https://bulma.io/" className="panel-block">
                        <span className="panel-icon">
                          <i className="fas fa-code"></i>
                        </span>
                        Bulma css framework references
                    </a>
                    <a href="https://www.udemy.com/react-the-complete-guide-incl-redux/" className="panel-block">
                        <span className="panel-icon">
                          <i className="fab fa-earlybirds"></i>
                        </span>
                        Udemy: React 16 - The Complete Guide  
                    </a>
                    <a href="https://fontawesome.com/" className="panel-block">
                        <span className="panel-icon">
                          <i className="fab fa-font-awesome"></i>
                        </span>
                        Font awesome for icons+ 
                    </a>
                    <a href="https://www.npmjs.com/package/react-easy-chart" className="panel-block">
                        <span className="panel-icon">
                          <i className="fab fa-font-awesome"></i>
                        </span>
                        React easy chart 
                    </a>
                    <a href="https://www.npmjs.com/package/react-google-charts" className="panel-block">
                          <span className="panel-icon">
                          <i className="fab fa-font-awesome"></i>
                        </span>
                        react-google-charts 
                    </a>
                    <a href="https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9" className="panel-block">
                          <span className="panel-icon">
                          <i className="fas fa-ambulance"></i>
                        </span>
                        SASS/SCSS Walkthrough 
                    </a>
                    
                    <a href="https://taroworks.org/wp-content/uploads/2016/08/FNC.png" className="panel-block">
                        <span className="panel-icon">
                          <i className="fas fa-coffee"></i>
                        </span>
                        Lots of coffee
                    </a>
                    <a>
                    </a>
                </nav>
            </div>
        </div>
  );

};
export default AboutUs;
