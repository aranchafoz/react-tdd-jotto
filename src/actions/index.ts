import axios from 'axios';

import { getLetterMatchCount } from '../helpers';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
};

/**
  * Return Redux Thunk function that dispatches GUESS_WORD action
  *   and (conditionally) CORRECT_GUESS action.
  * @function guessWord
  * @param {string} guessedWord - Guessed word.
  * @returns {function} - Redux Thunk function.
  */
export const guessWord = (guessedWord: string) => {
  return function(dispatch: any, getState: any) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    });

    if(guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS
      });
    }
  };
};

export const getSecretWord = ():any => {
  return (dispatch: any) => {
    return axios.get('http://localhost:3030')
      .then((response: any) => {
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: response.data
        })
      });
  };
};
