import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import {Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
function IconBackground(props) {
  return (
    <Svg
      width={responsiveWidth(375)}
      height={responsiveHeight(218)}
      viewBox="0 0 375 218"
      {...props}>
      <Path
        fill={Colors.darkGreen}
        fillRule="evenodd"
        d="M-.389 0h375v191S375 218 186 218-.389 191-.389 191V0z"
      />
    </Svg>
  );
}

export default IconBackground;
