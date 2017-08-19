const initialState = {
  currentUser: null,
  game: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return Object.assign({}, state, { currentUser: action.user });
    case 'UPDATE_GAME':
      return Object.assign({}, state, { game: action.game });
    default:
      return state;
  }
};
