import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from './actions';

interface IInputProps {
  store?: any;
  success: boolean;
  guessWord: Function;
}

export class UnconnectedInput extends Component<IInputProps, {}, {}> {
  render() {
    const { success, guessWord } = this.props;
    const contents = success
    ? null
    : (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          id="word-guess"
          type="text"
          placeholder="enter guess" />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={() => guessWord('train')}>
          Submit
        </button>
      </form>
    );
    return (
      <div data-test="component-input">
        { contents }
      </div>
    );
  }
};

interface IReduxState {
  success: boolean;
  guessedWords: {
    guessedWords: string;
    letterMatchCount: number;
  }[];
  secretWord: string | null;
}

const mapStateToProps = ({ success }: IReduxState) => {
  return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
