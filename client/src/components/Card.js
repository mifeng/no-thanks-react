import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUser, updateGame } from '../actions';

class Card extends Component {
  render() {
    const { game, index } = this.props.game;
    if (game && game.status === 'A') {
      return (
        <div className="card-container">
          {JSON.parse(game.deck)[index]}
        </div>
      );
    } else {
      return (
        <div className="card-container">
          0
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { main, game } = state;
  return { currentUser: main.currentUser, gameSocket: main.gameSocket, game };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUser, updateGame,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Card);
