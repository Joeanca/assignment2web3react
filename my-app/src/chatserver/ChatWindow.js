import React, {Component} from 'react'
import {render} from 'react-dom'
import {Launcher} from 'react-chat-window'
import {Socket} from './SocketClient.js'
import Notification from '../containers/notification.js'

class Chat extends Component {

    constructor(props, context) {
        super(props, context)
    
    
        this.state = {
          chatHistory: this.props.chatHistory,
          input: ''
        }
    
        this.onInput = this.onInput.bind(this)
        this._onMessageWasSent = this._onMessageWasSent.bind(this)
        this._sendMessage = this._sendMessage.bind(this)
        this.updateChatHistory = this.updateChatHistory.bind(this)
        this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
        this.onUserJoin = this.onUserJoin.bind(this)
        
      }
    
      componentDidMount() {
        this.props.registerHandler(this._sendMessage, this.onUserJoin)
        this.scrollChatToBottom()
      }
    
      componentDidUpdate() {
            
      }
    
      componentWillUnmount() {
        this.props.unregisterHandler()
        
      }
      scrollChatToBottom() {
      }
    
      onInput(e) {
        this.setState({
          input: e.target.value
        })
      }

      
      onUserJoin() {
        this.props.client.join(JSON.stringify("User login"));
        
        <Notification type="info" />
        
      }

      _onMessageWasSent(message) {
        this.setState({
            chatHistory: [...this.state.chatHistory, message]
        });
        console.log("on message was sent: " + JSON.stringify(message));
        //message.author = this.props.user;
        this.props.client.message(JSON.stringify(message), JSON.stringify(this.props.user));
      }
    
      _sendMessage(messageIn) {
        console.log("message received from emit: " + messageIn);
        var parsedIn = JSON.parse(messageIn);
        var parsedMessage = JSON.parse(parsedIn.message);
        var parseduser = JSON.parse(parsedIn.user);
        console.log("senderID: " + parseduser.id);
        console.log("receiverID: " + this.props.user.id);
        
        if(parseduser.id === this.props.user.id){
          parsedIn.author = "me";
        }
        console.log("Author " + parsedIn.author);
        if (parsedIn.message.length > 0) {
            this.setState({
                chatHistory: [...this.state.chatHistory, {
                author: parsedIn.author,
                type: 'text',
                data: parsedMessage.data
              }]
            })
          }
    }
    
    updateChatHistory(message) {
        console.log('update chat history: ' + message)
        this.setState({
            chatHistory: [...this.state.chatHistory, message]
          })
             
    }
    

  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'COMP 4513 - Assignment 2',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent}
        messageList={this.state.chatHistory}
        showEmoji
      />
    </div>)
  }
}

export default Chat;