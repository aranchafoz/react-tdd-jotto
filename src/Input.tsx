import React, { Component } from 'react';
import { connect } from 'react-redux';

interface IInputProps {
  store: any;
}

class Input extends Component<IInputProps, {}> {
  render() {
    return (
      <div>
        <button />
      </div>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps)(Input);
