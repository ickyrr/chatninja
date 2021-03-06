import React from 'react';
import MessagesBox from '../containers/messages_box.js';
import MessagesSend from '../containers/messages_send.js';
import UsersOnline from '../../users/containers/users_online.js';

class MessagesLayout extends React.Component {

  componentWillMount(){
    document.body.style.overflow = 'hidden';
    this.setState({
    recipientId: this.props.recipientId,
    recipient: this.props.recipient,
    });
  }

  componentWillUnmount(){
    document.body.style.overflow = 'auto';
  }

  handleRecipientId(recipient){
   this.setState({
    recipientId: recipient._id,
    recipient: recipient,
   })
  }

  render() {

   const {userMessages} = this.props;

  return (
    <div>
      <div id="wrapper">
        <div id="sidebar-wrapper" className="col-md-2">
          <div id="sidebar">

              <UsersOnline
               onhandleRecipientId={this.handleRecipientId.bind(this)}
               userMessages={userMessages}/>
          </div>
        </div>

        {(this.state.recipient && this.state.recipientId && this.state.recipientId != Meteor.userId()) ?
        <div id="main-wrapper" className="col-xs-12 col-sm-12 col-md-10 pull-right">

          <h3>
            <img src={this.state.recipient.profile.avatar} alt="" className="img-responsive pull-left" style={{height: '26px', padding: '0 10px 0 20px'}}/>
            <a href={'/users/profile/' + this.state.recipient._id}>{this.state.recipient.profile.username}</a>
            {/*{(this.state.recipient.status.online && !this.state.recipient.status.idle) ? <span style={{color: 'green'}} className="glyphicon glyphicon-one-fine-dot"></span> :
            (this.state.recipient.status.online && this.state.recipient.status.idle) ? <span style={{color: 'orange'}} className="glyphicon glyphicon-one-fine-dot"></span> :
            <span style={{color: 'gray'}} className="glyphicon glyphicon-one-fine-dot"></span>
            }*/}
          </h3>

          {/*{(this.state.recipient.status.idle) ?
            <p style={{paddingLeft: '5px', verticalAlign: 'text-botttom'}}>
            active {moment(this.state.recipient.status.lastActivity).startOf().fromNow()}
            </p> :
            ""
          }*/}

          <MessagesBox recipientId={this.state.recipientId}/>

          <div className="col-md-12 footer">
            <MessagesSend recipientId={this.state.recipientId}/>
          </div>

        </div> :
        <div id="main-wrapper" className="col-xs-12 col-sm-12 col-md-10 pull-right">

          <div className="marginTop" style={{textAlign: 'center'}}>
            <h2>ChatNinja is a great tool to have awesome conversations!</h2>
            <h4>You may also use this to annoy anyone. Haha!</h4>
            <p>Click a username on the left to initiate chat.</p>
          </div>

        </div>}

      </div>

    </div>
  )
  }
}

export default MessagesLayout;
