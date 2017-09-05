import axios from 'axios';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// sub components
import Chatbox from './Chatbox';
import GameView from './GameView';
import { updateUser, updateGame, updateCards, resetGame } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.endGame = this.endGame.bind(this);
    this.fetchGame = this.fetchGame.bind(this);
    this.fetchCards = this.fetchCards.bind(this);
    this.listenFor = this.listenFor.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getCurrentUser')
    .then((res) => { this.props.updateUser(res.data); })
    .then(() => {
      const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const socket = new ReconnectingWebSocket(`${wsScheme}://${window.location.host}/socket/websocket`);
      socket.debug = true;
      socket.timeoutInterval = 5400;
      // const socket = new WebSocket(`ws://${window.location.host}/socket/`);
      socket.onopen = () => {
        const msg = `${this.props.currentUser.username} logged in`;
        socket.send(JSON.stringify({ event: msg }));
      };
      socket.onmessage = (e) => { this.listenFor(JSON.parse(e.data)); };
      if (socket.readyState === WebSocket.OPEN) socket.onopen();
      this.fetchGame();
    })
    .catch((err) => { console.warn(err); });
  }

  listenFor(data) {
    if (data.trigger) { this[data.trigger](data.args); }
    if (data.event) { console.log(data.event); }
  }

  endGame(winner) {
    alert(`game over! The winner is ${winner}`);
    this.fetchGame();
    this.props.resetGame();
  }

  fetchGame() {
    axios.get('/api/fetchGame/')
    .then((res) => {
      this.props.updateGame(res.data.game);
      if (res.data.game && res.data.game.status === 'A') this.fetchCards();
    })
    .catch((err) => { console.warn(err, 'fetch game error'); });
  }

  fetchCards() {
    axios.get('/api/fetchCards/')
    .then((res) => { this.props.updateCards(res.data); })
    .catch((err) => { console.warn(err, 'fetch cards error'); });
  }

  render() {
    return (
      <div>
        <div className="top-container">
          <a href="/logout">Logout</a>
        </div>
        <div className="no-thanks-container">
          <GameView {...this.props} />
          <Chatbox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { main } = state;
  return { currentUser: main.currentUser, gameInfo: main.game };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUser, updateGame, updateCards, resetGame,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
