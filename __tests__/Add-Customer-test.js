/**
 * @format
 */

import 'react-native';
import React from 'react';
import AddCustomer from '@modules/customer/AddCustomer';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-orientation-locker', () => {
  return {
    getInitialOrientation: jest.fn(),
  };
});

test('renders correctly', () => {
  const tree = renderer.create(<AddCustomer />).toJSON();
  expect(tree).toMatchSnapshot();
});
