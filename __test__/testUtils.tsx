import checkPropTypes from 'check-prop-types';

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
}
