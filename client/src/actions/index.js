export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export const updateGame = (game) => {
  return {
    type: 'UPDATE_GAME',
    game,
  };
};

export const updateCards = (data) => {
  return {
    type: 'UPDATE_CARDS',
    data,
  };
};

export const resetGame = () => {
  return {
    type: 'RESET_GAME',
  };
};
