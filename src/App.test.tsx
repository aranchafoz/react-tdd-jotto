import React, { Component } from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../__test__/testUtils';
import App from './App';

/**
  * Factory function to create a ShallowWrapper for the App component
  * @function setup
  * @param {object} initialState - Initial state for this setup.
  * @returns {ShallowWrapper}
*/
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}

test('renders without crashing', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('redux properties', () => {
  test('has access to `success` state', () => {
    const success = true;
    const wrapper = setup({ success });
    const wrapperInstance: Component<any, any, any> = wrapper.instance();
    const successProp = wrapperInstance.props.success;
    expect(successProp).toBe(success);
  });
  test('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const wrapperInstance: Component<any, any, any> = wrapper.instance();
    const secretWordProp = wrapperInstance.props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('has access to `guessedWords` state', () => {
    const guessedWords = [ { guessedWord: 'train', letterMatchCount: 3 } ];
    const wrapper = setup({ guessedWords });
    const wrapperInstance: Component<any, any, any> = wrapper.instance();
    const guessedWordsProp = wrapperInstance.props.guessedWords;
    expect(guessedWordsProp).toBe(guessedWords);
  });
  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const wrapperInstance: Component<any, any, any> = wrapper.instance();
    const getSecretWordProp = wrapperInstance.props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});
