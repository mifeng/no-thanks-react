import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import { updateCards, updateGame } from '../actions';

class PlayerOptions extends Component {
  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame() {
    const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new ReconnectingWebSocket(`${wsScheme}://${window.location.host}${window.location.pathname}websocket`);
    socket.debug = true;
    socket.timeoutInterval = 5400;
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
    const { gameInfo, currentUser, game } = this.props;
    const takeCard = () => { axios.get('/api/takeCard/'); };
    const skipCard = () => { axios.get('/api/skipCard/'); };
    let playerNum = 0;
    if (this.props.game && this.props.game.players && this.props.currentUser) {
      playerNum = this.props.game.players.indexOf(this.props.currentUser.username);
    }

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
    const myTurn = game.currentPlayer === currentUser.username;
    const highlightCtrl = (myTurn ? 'highlighted-player' : 'none');
    return (
      <div className="player-options-container" id={highlightCtrl}>
        <h4>{currentUser.username}</h4>
        <button
          disabled={!myTurn}
          onClick={takeCard}
        >
          {game.coins[playerNum] <= 0 ? 'I have to take it' : 'Sweet Spot... I will take it!'}
        </button>
        <button
          onClick={skipCard}
          disabled={!myTurn || game.coins[playerNum] <= 0}
        >
          No thanks~
        </button> <br />
        <b>current coins:</b> {game.coins[playerNum]} <br />
        <div className="small-cards-container">
          {game.cards[playerNum].map((num, i) => (
            <div className="small-card" key={i}>{num}</div>
          ))}
        </div>
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
