import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function Icon9dot(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Defs>
        <Path
          id="prefix__a"
          d="M6 17a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1h3zm7.5 0a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1h3zm7.5 0a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1h3zM6 9.5a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1h3zm7.5 0a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1h3zm7.5 0a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1h3zM6 2a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h3zm7.5 0a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V3a1 1 0 011-1h3zM21 2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V3a1 1 0 011-1h3z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
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

export default Icon9dot;
