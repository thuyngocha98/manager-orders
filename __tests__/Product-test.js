/**
 * @format
 */

import 'react-native';
import React from 'react';
import Product from '@modules/product/Product';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-orientation-locker', () => {
  return {
    getInitialOrientation: jest.fn(),
  };
});

test('renders correctly', () => {
  const tree = renderer.create(<Product />).toJSON();
  expect(tree).toMatchSnapshot();
});
