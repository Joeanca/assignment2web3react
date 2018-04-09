import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
// import '../styles/chat/chat.scss';

class Chat extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
          chatHistory: this.props.chatHistory,
          input: '', 
          isOpen: true
        }
    
        this.onInput = this.onInput.bind(this)
        this._onMessageWasSent = this._onMessageWasSent.bind(this)
        this._sendMessage = this._sendMessage.bind(this)
        this.updateChatHistory = this.updateChatHistory.bind(this)
        this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
        this.onUserJoin = this.onUserJoin.bind(this)
        this.checkwindowopen = this.checkwindowopen.bind(this)
        
    }
    
      componentDidMount() {
        this.props.registerHandler(this._sendMessage, this.onUserJoin, this.updateChatHistory)
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
        
      }

      diplaySender(user){
      }

      _onMessageWasSent(message) {
        //this.setState({
        //    chatHistory: [...this.state.chatHistory, message]
        //});
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
        console.log("receiverID: " + this.props.userid);
        
        parseduser.id === this.props.userid ? parsedIn.author = "me" : parsedIn.author = parseduser.first_name + " " + parseduser.last_name;
        console.log("Author " + parsedIn.author);
        if (parsedIn.message.length > 0) {
            this.setState({
                chatHistory: [...this.state.chatHistory, {
                author: parsedIn.author,
                type: parsedMessage.type,
                data: parsedMessage.data
              }]
            })
          }
          console.log("is chat open: " + this.state.isOpen);
          if(this.state.isOpen){
            this.props.notification('message', parsedIn.author, parsedMessage.data.text); 
            
          }
    }
    
    updateChatHistory(message) {
        console.log('update chat history: ' + message)
        this.setState({
            chatHistory: [...this.state.chatHistory, message]
          })
             
    }
    
    checkwindowopen(status){
      console.log("updated status: " + status);
      this.setState({
        isOpen: status 
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
        activeUser={this.props.user}
        showEmoji
        checkwindow={this.checkwindowopen}
      />
    </div>)
  }
}

export default Chat;