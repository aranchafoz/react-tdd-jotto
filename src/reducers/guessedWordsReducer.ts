import { actionTypes } from '../actions';

interface IAction {
  type?: string;
  payload?: {
    guessedWord: string;
    letterMatchCount: number;
  };
}

/**
  * @function guessedWordsReducer
  * @param {array} state - Array of guessed words.
  * @param {object} action - action to be reduced.
  * @returns {boolean} - new guessedWords state.
*/
export default (state: any = [], action: IAction) => {
  switch(action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    default:
      return state;
  }
};
