import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Notification extends Component {
    constructor(props){
         super(props);
         this.state={
          user: this.props.user,
          username: this.props.user.first_name + " " + this.props.user.last_name
         };
     }
      
     createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info(this.state.username + " Logged in");
              break;
            case 'success': 
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            default:
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
     
      render() {
        return (
          <div>
                
            <NotificationContainer/>
            {NotificationManager.info(this.state.username + " Logged in")}

          </div>
        );
      }
}
export default Notification;