import React, { Component } from 'react';

class Opponent extends Component {
  render() {
    // if (this.props.game.game && this.props.game.game.status === 'A') {
      return (
        <div className="opponent-container">
          <h4>{this.props.username}</h4>
          <b>current #:</b> 0 <br />
          <b>current card total:</b> 100 <br />
          <b>current score:</b> 100 <br />
        </div>
      );
    // } else {
    //   return (
    //     <div className="opponent-container">
    //       <h4>loading...</h4>
    //       <b>current #:</b> 0 <br />
    //       <b>current card total:</b> 100 <br />
    //       <b>current score:</b> 100 <br />
    //     </div>
    //   );
    // }
  }
}

export default Opponent;
