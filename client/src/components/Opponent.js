import React, { Component } from 'react';

class Opponent extends Component {
  render() {
    const { pn, game } = this.props;

    if (game.players) {
      const highlightCtrl = (game.players[pn] === game.currentPlayer ? 'highlighted-player' : 'none');
      return (
        <div className="opponent-container" id={highlightCtrl}>
          <h4>{game.players[pn]}</h4>
          <b>current coins:</b> {game.coins[pn]} <br />
          <div className="small-cards-container">
            {game.cards[pn].map(num => (
              <div className="small-card" key={num}>{num}</div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="opponent-container">
        <h4>Loading...</h4>
        <b>current coins:</b> 0 <br />
      </div>
    );
  }
}

export default Opponent;
