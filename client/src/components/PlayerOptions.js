import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCards, updateGame } from '../actions';

class PlayerOptions extends Component {
  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame() {
    const socket = new WebSocket(`ws://${window.location.host}/socket/`);
    socket.onopen = () => {
      const msg = `${this.props.currentUser.username} joined game`;
      socket.send(JSON.stringify({ event: msg }));
    };
    axios.post('/api/joinGame/', { id: this.props.gameInfo.id })
    .then((res) => {
      console.log('game data: ', res.data);
      this.props.updateGame(res.data.game);
    })
    .catch((err) => { console.log(err); });
  }

  startNewGame() {
    axios.get('/api/createNewGame/')
    .then((res) => { this.props.updateGame(res.data); })
    .catch((err) => { throw err; });
  }

  render() {
    const { gameInfo, currentUser } = this.props;
    const takeCard = () => { axios.get('/api/takeCard/'); console.log(this.props.game.cards); };
    const skipCard = () => { axios.get('/api/skipCard/'); };

    if (!currentUser) {
      return (<div className="player-options-container"> loading...</div>);
    } else if (!gameInfo) {
      return (
        <div className="player-options-container">
          <h4>{currentUser.username}</h4>
          <button onClick={this.startNewGame}>Start New Game</button>
        </div>
      );
    } else if (gameInfo.status === 'W') {
      return (
        <div className="player-options-container">
          <h4>{currentUser.username}</h4>
          <div>Waiting for other players to start...</div>
          <button onClick={this.joinGame}>Add more users</button>
        </div>
      );
    }
    return (
      <div className="player-options-container">
        <h4>{currentUser.username}</h4>
        <button onClick={takeCard}>Sweet Spot... I will take it!</button>
        <button onClick={skipCard}>No thanks~</button> <br />
        <b>current #:</b> 0 <br />
        <b>current card total:</b> 100 <br />
        <b>current score:</b> 100 <br />
        {this.props.game.cards.map((num, i) => (
          <div key={i}>{num}</div>
        ))}
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


export default connect(mapStateToProps, matchDispatchToProps)(PlayerOptions);
