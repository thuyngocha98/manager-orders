/**
 * @format
 */

import 'react-native';
import React from 'react';
import EditAddressCustomer from '@modules/customer/EditAddressCustomer';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-orientation-locker', () => {
  return {
    getInitialOrientation: jest.fn(),
  };
});

describe('render correctly', () => {
  const props = {
    route: {
      params: {
        address: '123 Le Duan, Quan 1, Ho Chi Minh',
      },
    },
  };
  jest.useFakeTimers();
  it('render edit address customer', () => {
    const tree = renderer.create(<EditAddressCustomer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
