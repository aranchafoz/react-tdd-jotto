import { actionTypes } from '../actions';

/**
  * @function successReducer
  * @param {array} state - Array of guessed words.
  * @param {object} action - action to be reduced.
  * @returns {boolean} - new success state.
*/
export default (state: any = false, action: { type?: string }) => {
  switch(action.type) {
    case (actionTypes.CORRECT_GUESS):
      return true;
    default:
      return state;
  }
}
