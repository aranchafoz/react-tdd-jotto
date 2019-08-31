import React, { Component } from 'react';
import { connect } from 'react-redux';

interface IInputProps {
  store: any;
  success: boolean;
}

class Input extends Component<IInputProps, {}> {
  render() {
    const { success } = this.props;
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
          type="submit">
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

const mapStateToProps = ({ success }: any) => {
  return { success };
};

export default connect(mapStateToProps)(Input);
