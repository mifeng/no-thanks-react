const initialState = {
  currentUser: null,
  gameSocket: `ws://${window.location.host}/game/`,
  chatSocket: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return Object.assign({}, state, { currentUser: action.user });
    default:
      return state;
  }
};
