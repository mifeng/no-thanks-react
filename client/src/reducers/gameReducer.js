const initialState = {
  cards: [[], [], [], [], []],
  coins: [[], [], [], [], []],
  players: null,
  currentPlayer: '',
  currentCard: 0,
  centerCoinCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CARDS':
      return Object.assign({}, state, {
        cards: action.data.cards,
        coins: action.data.coins,
        currentPlayer: action.data.current_player,
        currentCard: action.data.current_card,
        centerCoinCount: action.data.center_coin_count,
        players: action.data.players,
      });
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};
