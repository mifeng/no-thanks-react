import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCards, updateGame } from '../actions';

// sub components
import Card from './Card';
import Opponent from './Opponent';
import PlayerOptions from './PlayerOptions';

class GameView extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let playerNum = 0;
    if (this.props.game && this.props.game.players && this.props.currentUser) {
      playerNum = this.props.game.players.indexOf(this.props.currentUser.username);
      console.log('playernum', playerNum);
    }
    const p2 = playerNum + 1 > 4 ? playerNum - 4 : playerNum + 1;
    const p3 = playerNum + 2 > 4 ? playerNum - 3 : playerNum + 2;
    const p4 = playerNum + 3 > 4 ? playerNum - 2 : playerNum + 3;
    const p5 = playerNum + 4 > 4 ? playerNum - 1 : playerNum + 4;

    return (
      <div className="game-view-container">
        <div id="row-1">
          <div id="opponent-4" className="opponent">
            <Opponent {...this.props} pn={p4} />
          </div>
          <div id="opponent-3" className="opponent">
            <Opponent {...this.props} pn={p3} />
          </div>
        </div>
        <div id="row-2">
          <div id="opponent-5" className="opponent">
            <Opponent {...this.props} pn={p5} />
          </div>
          <Card />
          <div id="opponent-2" className="opponent">
            <Opponent {...this.props} pn={p2} />
          </div>
        </div>
        <PlayerOptions {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { main, game } = state;
  return { currentUser: main.currentUser, gameInfo: main.game, game };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCards, updateGame,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(GameView);
