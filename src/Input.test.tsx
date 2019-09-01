import React from 'react';
import { shallow } from 'enzyme';
import { Component } from 'react';

import { findByTestAttr, storeFactory } from '../__test__/testUtils';
import Input from './Input';

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
