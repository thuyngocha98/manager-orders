import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function Icon6dot(props) {
  return (
    <Svg width={12} height={20} viewBox="0 0 12 20" {...props}>
      <Defs>
        <Path
          id="prefix__a"
          d="M8.381 17.238a2.38 2.38 0 110 4.758 2.38 2.38 0 010-4.757zm6.667 0a2.38 2.38 0 11.002 4.758 2.38 2.38 0 01-.003-4.757zM8.38 9.62a2.38 2.38 0 11-.002 4.762A2.38 2.38 0 018.38 9.62zm6.667 0a2.38 2.38 0 110 4.762 2.38 2.38 0 010-4.763zM8.38 2a2.38 2.38 0 11-.002 4.76A2.38 2.38 0 018.38 2zm6.667 0a2.38 2.38 0 110 4.76 2.38 2.38 0 010-4.76z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-6 -2)">
        <Mask id="prefix__b" fill="#ffffff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use fill="#FFFFFF" xlinkHref="#prefix__a" />
        <G fill="#FFFFFF" mask="url(#prefix__b)">
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default Icon6dot;
