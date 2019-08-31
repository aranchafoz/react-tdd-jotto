import React from 'react';
import PropTypes from 'prop-types';

interface IGuessedWordsProps {
  guessedWords: {
    guessedWord: string;
    letterMatchCount: number;
  }[];
}

const GuessedWords = (props: IGuessedWordsProps) => {
  let contents;
  if(props.guessedWords.length === 0) {
    contents = (
      <span data-test="guess-intructions">
        Try to guess the secret word!
      </span>
    );
  }
  return (
    <div data-test="component-guessed-words">
      { contents }
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GuessedWords;
