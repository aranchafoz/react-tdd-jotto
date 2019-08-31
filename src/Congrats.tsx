import React from 'react';
import PropTypes from 'prop-types';

interface ICongratsProps {
  success: boolean;
}

const Congrats = (props: ICongratsProps) => {
  if(props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    )
  } else {
    return (
      <div data-test="component-congrats" />
    )
  }
};

Congrats.propsTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
