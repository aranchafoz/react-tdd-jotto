import { actionTypes } from '../actions';

interface IAction {
  type?: string;
  payload?: string;
}

/**
  * @function secretWordReducer
  * @param {string} state - State before reducer.
  * @param {object} action - Action sent to reducer.
  * @returns {boolean} - New state (secret word payload from action).
*/
export default (state: any = null, action: IAction) => {
  switch(action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  }
}
