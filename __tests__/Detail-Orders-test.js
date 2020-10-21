/**
 * @format
 */

import 'react-native';
import React from 'react';
import DetailOrder from '@modules/orders/DetailOrder';
// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

jest.mock('react-native-orientation-locker', () => {
  return {
    getInitialOrientation: jest.fn(),
  };
});

describe('render correctly', () => {
  const props = {
    route: {
      params: {nameProduct: 'S0N00113'},
    },
  };
  jest.useFakeTimers();
  it('render details orders', () => {
    const tree = renderer.create(<DetailOrder {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
