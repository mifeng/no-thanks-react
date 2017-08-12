import React, { Component } from 'react';

// sub components
import Card from './Card';
import Opponent from './Opponent';
import PlayerOptions from './PlayerOptions';

class GameView extends Component {
  render() {
    return (
      <div className="game-view-container">
        <div id="row-1">
          <div id="opponent-3" className="opponent">
            3 <Opponent />
          </div>
          <div id="opponent-4" className="opponent">
            4 <Opponent />
          </div>
        </div>
        <div id="row-2">
          <div id="opponent-5" className="opponent">
            5<Opponent />
          </div>
          <Card />
          <div id="opponent-2" className="opponent">
            2<Opponent />
          </div>
        </div>
        <PlayerOptions {...this.props} />
      </div>
    );
  }
}

export default GameView;
