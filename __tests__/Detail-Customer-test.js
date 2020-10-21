/**
 * @format
 */

import 'react-native';
import React from 'react';
import DetailCustomer from '@modules/customer/DetailCustomer';
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
          name: 'Chi Ly',
        },
      },
    },
  };

  jest.useFakeTimers();
  it('render details customer', () => {
    const tree = renderer.create(<DetailCustomer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
