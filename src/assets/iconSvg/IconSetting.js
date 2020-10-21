import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconSetting(props) {
  return (
    <Svg width={20} height={14} viewBox="0 0 20 14" {...props}>
      <Defs>
        <Path
          id="prefix__a"
          d="M19.75 17a1.25 1.25 0 010 2.5H4.25a1.25 1.25 0 010-2.5h15.5zm0-6a1.25 1.25 0 010 2.5H4.25a1.25 1.25 0 010-2.5h15.5zm0-6a1.25 1.25 0 010 2.5H4.25a1.25 1.25 0 010-2.5h15.5z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -5)">
        <Mask id="prefix__b" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use fill="#D8D8D8" xlinkHref="#prefix__a" {...props} />
        <G fill="#98A1B1" mask="url(#prefix__b)" {...props}>
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconSetting;
