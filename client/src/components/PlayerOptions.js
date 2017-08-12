import axios from 'axios';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementIndex } from '../actions';

class PlayerOptions extends Component {
  constructor(props) {
    super(props);
    this.takeCard = this.takeCard.bind(this);
    this.skipCard = this.skipCard.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame() {
    const socket = new WebSocket(`ws://${window.location.host}/socket/`);
    socket.onopen = () => {
      const msg = `${this.props.currentUser.username} joined game`;
      socket.send(JSON.stringify({ event: msg }));
    };
    axios.post('/api/joinGame/', { id: this.props.game.game.id })
    .then((res) => {
      console.log('game data: ', res.data);
      this.props.updateGame(res.data.game, res.data.playerNumber);
    })
    .catch((err) => { console.log(err); });
  }

  takeCard() {
    this.props.incrementIndex();
    const socket = new WebSocket(`ws://${window.location.host}/socket/`);
    socket.onopen = () => {
      const msg = `${this.props.currentUser.username} took card`;
      socket.send(JSON.stringify({ event: msg }));
    };
  }

  skipCard() {
    axios.post('/api/skipCard/')
    .then((res) => {
      console.log(`${window.user} skipped card; data: ${res.data}`);
      this.setState({
        coinTotal: this.state.coinTotal - 1,
      });
    })
    .catch((err) => { console.log(err); });
  }

  startNewGame() {
    axios.get('/api/createNewGame/')
    .then((res) => {
      console.log(res.data.data);
      this.props.updateGame(res.data);
    })
    .catch((err) => { console.log(err); });
  }


  render() {
    const { game, currentUser } = this.props;
    if (!currentUser) {
      return (<div className="player-options-container"> loading...</div>);
    } else if (!game.game) {
      return (
        <div className="player-options-container">
          <h4>{currentUser.username}</h4>
          <button onClick={this.startNewGame}>Start New Game</button>
        </div>
      );
    } else if (game.game.status === 'W') {
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
        <button onClick={this.takeCard}>Sweet Spot... I will take it!</button>
        <button onClick={this.skipCard}>No thanks~</button> <br />
        <b>current #:</b> 0 <br />
        <b>current card total:</b> 100 <br />
        <b>current score:</b> 100 <br />
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
    incrementIndex,
  }, dispatch);
};


export default connect(mapStateToProps, matchDispatchToProps)(PlayerOptions);
