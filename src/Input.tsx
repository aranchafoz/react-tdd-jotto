import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from './actions';

interface IInputProps {
  store?: any;
  success?: boolean;
  guessWord: Function;
}

export class UnconnectedInput extends Component<IInputProps, {}, {}> {
  private inputBox: any;

  /**
   * Create ref for input box.
   * @method constructor
   * @param {object} props - Component props.
   * @returns {undefined}
   */
  constructor(props: IInputProps) {
    super(props);

    this.inputBox = React.createRef();
    this.submitGuessWord = this.submitGuessWord.bind(this);
  }

  submitGuessWord(e: any) {
    // don't submit form
    e.preventDefault();

    const guessedWord = this.inputBox.current.value;
    if(guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }
    this.inputBox.current.value = '';
  }

  render() {
    const { success } = this.props;
    const contents = success
    ? null
    : (
      <form className="form-inline">
        <input
          data-test="input-box"
          ref={this.inputBox}
          className="mb-2 mx-sm-3"
          id="word-guess"
          type="text"
          placeholder="enter guess" />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={this.submitGuessWord}>
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
