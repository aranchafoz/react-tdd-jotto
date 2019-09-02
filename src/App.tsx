import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import { getSecretWord } from './actions';

interface IAppProps {
  store?: any;
  success?: boolean;
  secretWord?: string;
  guessedWords?: {
    guessedWord: string;
    letterMatchCount: number;
  }[];
  getSecretWord?: Function;
}

export class UnconnectedApp extends Component<any, {}> {

  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }

  render() {
    const { success, guessedWords } = this.props;
    return (
      <div data-test="component-app" className="container">
        <h1>Jotto</h1>
        <Congrats success={success} />
        <Input />
        <GuessedWords guessedWords={guessedWords} />
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

const mapStateToProps = ({ success, secretWord, guessedWords }: IReduxState) => {
  return { success, secretWord, guessedWords };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
