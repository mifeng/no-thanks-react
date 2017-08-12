import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import gameReducer from './gameReducer';

const allReducers = combineReducers({
  main: mainReducer,
  game: gameReducer,
});

export default allReducers;
