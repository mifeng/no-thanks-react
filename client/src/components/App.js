import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// sub components
import Chatbox from './Chatbox';
import GameView from './GameView';
import { updateUser, updateGame } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchGame = this.fetchGame.bind(this);
    this.listenFor = this.listenFor.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getCurrentUser')
    .then((res) => { this.props.updateUser(res.data); })
    .then(() => {
      const socket = new WebSocket(`wss://${window.location.host}/socket/`);
      socket.onmessage = (e) => { this.listenFor(JSON.parse(e.data)); };
      socket.onopen = () => {
        const msg = `${this.props.currentUser.username} logged in`;
        socket.send(JSON.stringify({ event: msg }));
      };
      if (socket.readyState === WebSocket.OPEN) socket.onopen();
      this.fetchGame();
    })
    .catch((err) => { console.warn(err); });
  }

  listenFor(data) {
    if (data.trigger) { this[data.trigger](); }
    if (data.event) { console.log(data.event); }
  }

  fetchGame() {
    axios.get('/api/fetchGame/')
    .then((res) => { this.props.updateGame(res.data.game); })
    .catch((err) => { console.warn(err, 'fetch game error'); });
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
  const { main, game } = state;
  return { currentUser: main.currentUser, gameSocket: main.gameSocket, game };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUser, updateGame,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
