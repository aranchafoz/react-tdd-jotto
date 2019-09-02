import React from 'react';
import { shallow } from 'enzyme';
import { Component } from 'react';

import { findByTestAttr, storeFactory } from '../__test__/testUtils';
import Input, { UnconnectedInput } from './Input';

/**
  * Factory function to create a ShallowWrapper for the Input component
  * @function setup
  * @param {object} initialState - Initial state for this setup.
  * @returns {ShallowWrapper}
*/
const setup = ( initialState = {} ) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive().dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper: any; // FIXME ShallowWrapper

    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });
  describe('word has been guessed', () => {
    let wrapper: any; // FIXME ShallowWrapper

    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('does not renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    // FIXME: f*ing Input prop type is lost somehow and
    // this gipsy code is needed for access success property.
    // If you know a better way... DO IT!!
    const wrapperInstance: Component<any, any, any> = wrapper.instance();
    const successProp = wrapperInstance.props.success;
    expect(successProp).toBe(success);
  });
  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    // FIXME: f*ing Input prop type is lost somehow and
    // this gipsy code is needed for access success property.
    // If you know a better way... DO IT!!
    const wrapperInstance: Component<any, any, any> = wrapper.instance();
    const guessWordProp = wrapperInstance.props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('`guessWord` action creator call', () => {
  let guessWordMock: any;
  let wrapper: any; // FIXME: ShallowWrapper
  const guessedWord = 'train';

  beforeEach(() => {
    // set up mock for guessWord
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    };

    // set up app component with guessWordMock as guessWord prop
    wrapper = shallow<UnconnectedInput>(<UnconnectedInput {...props}/>);

    // add value to input box
    wrapper.instance().inputBox.current = { value: guessedWord };

    // simulate clicked
    const button = findByTestAttr(wrapper, 'submit-button');
    button.simulate('click', { preventDefault() {} });
  });

  test('calls `guessWord` when button is clicked', () => {
    // check to see if mock ran
    const guessWordCallCount = guessWordMock.mock.calls.length;

    expect(guessWordCallCount).toBe(1);
  });
  test('calls `guessWord` with input value as argument', () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });
});
