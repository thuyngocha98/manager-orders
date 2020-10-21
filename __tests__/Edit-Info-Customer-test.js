/**
 * @format
 */

import 'react-native';
import React from 'react';
import EditDetailInfoCustomer from '@modules/customer/EditDetailInfoCustomer';
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
        data: {
          id: 0,
          name: 'Sữa Rửa Mặt Trà Xanh - 10ml',
        },
      },
    },
  };
  jest.useFakeTimers();
  it('render edit info customer', () => {
    const tree = renderer
      .create(<EditDetailInfoCustomer {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
