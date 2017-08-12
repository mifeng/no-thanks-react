export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export const updateGame = (game, playerNumber) => {
  return {
    type: 'UPDATE_GAME',
    game,
    playerNumber,
  };
};

export const incrementIndex = () => {
  return {
    type: 'INCREMENT_INDEX',
  };
};
