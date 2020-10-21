import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconPlus(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Defs>
        <Path
          id="a"
          d="M12 2c.789 0 1.429.64 1.429 1.429l-.001 7.142h7.143a1.429 1.429 0 110 2.858l-7.143-.001v7.143a1.428 1.428 0 11-2.857 0v-7.143H3.429a1.43 1.43 0 010-2.857h7.142V3.429c0-.79.64-1.429 1.429-1.429z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
        <Mask id="b" fill="#ffffff">
          <Use xlinkHref="#a" />
        </Mask>
        <Use fill="#ffffff" xlinkHref="#a" />
        <G fill="#ffffff" mask="url(#b)">
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconPlus;
