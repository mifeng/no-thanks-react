import React, { Component } from 'react';

class Opponent extends Component {
  render() {
    const { pn, game } = this.props;
    if (game.players) {
      return (
        <div className="opponent-container">
          <h4>{game.players[pn]}</h4>
          <b>current #:</b> 0 <br />
          <b>current card total:</b> 100 <br />
          <b>current score:</b> 100 <br />
        </div>
      );
    } else {
      return (
        <div className="opponent-container">
          <h4>Loading...</h4>
          <b>current #:</b> 0 <br />
          <b>current card total:</b> 100 <br />
          <b>current score:</b> 100 <br />
        </div>
      );
    }
  }
}

export default Opponent;
