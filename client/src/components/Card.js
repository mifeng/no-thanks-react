import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCards } from '../actions';

class Card extends Component {
  render() {
    const { game, gameInfo } = this.props;
    if (gameInfo && gameInfo.status === 'A') {
      const coins = new Array(game.centerCoinCount);
      coins.fill('c');
      return (
        <div className="card-container">
          {game.currentCard}
          <div className="coins-container">
            {coins.map((c) => {
              return (<div className="coin" />);
            })}
          </div>
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
  return { gameInfo: main.game, game };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCards,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Card);
