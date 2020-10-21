import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconHome(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Defs>
        <Path
          id="prefix__a"
          d="M15 15.72a3 3 0 10-6 0v6H3a1 1 0 01-1-1V10.2c0-.304.138-.591.375-.78l9-7.2a.999.999 0 011.25 0l9 7.2a.997.997 0 01.375.78v10.52a1 1 0 01-1 1h-6z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
        <Mask id="prefix__b" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use fill="#0C66FF" xlinkHref="#prefix__a" {...props} />
        <G fill="#98A1B1" mask="url(#prefix__b)" {...props}>
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconHome;
