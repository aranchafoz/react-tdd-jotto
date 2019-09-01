import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore';

/**
  * Create a testing store with imported reducers, middleware, and initial state.
  * globals: rootReducer, middlewares
  * @function storeFactory
  * @param {object} initialState - Initial state for store.
  * @returns {Store} - Redux store.
*/
export const storeFactory = (initialState?: any) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

/**
  * Return ShallowWrapper containing node(s) with the given data-test value.
  * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
  * @param {string} val - Value of data-test attribute for search.
  * @returns {ShallowWrapper}
*/
export const findByTestAttr = (wrapper: any, val: string) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component: any, conformingProps: object) => {
  const propError = checkPropTypes(
    component.propsTypes,
    conformingProps,
    'prop',
    component.name);
  expect(propError).toBeUndefined();
};
