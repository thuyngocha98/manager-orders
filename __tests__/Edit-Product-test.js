/**
 * @format
 */

import 'react-native';
import React from 'react';
import EditProduct from '@modules/product/EditProduct';
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
          size: 'Mặc định',
          sku: 'PNV20',
          retailPrice: '290.000',
          businessPrice: '210.000',
          importPrice: '160.000',
          description: 'no description',
          unit: 'hộp',
          enableSell: true,
          amount: 2,
          uri:
            'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Image_-_Google_Docs.png',
        },
      },
    },
  };
  jest.useFakeTimers();
  it('render edit product', () => {
    const tree = renderer.create(<EditProduct {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
