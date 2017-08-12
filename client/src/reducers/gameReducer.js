const initialState = {
  game: null,
  playerNumber: null,
  index: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GAME':
      return Object.assign({}, state, { game: action.game });
    case 'INCREMENT_INDEX':
      return Object.assign({}, state, { index: state.index + 1 });
    default:
      return state;
  }
};
