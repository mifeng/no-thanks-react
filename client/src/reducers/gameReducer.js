const initialState = {
  game: null,
  playerNumber: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GAME':
      return Object.assign({}, state, { game: action.game });
    default:
      return state;
  }
};
