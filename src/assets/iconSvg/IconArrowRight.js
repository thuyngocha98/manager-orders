import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconArrowRight(props) {
  return (
    <Svg width={7} height={12} viewBox="0 0 7 15" {...props}>
      <Defs>
        <Path
          id="a"
          d="M12 13.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 13.586z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="rotate(-90 5.5 13.5)">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Use fill="#98A1B1" xlinkHref="#a" />
        <G fill="#98A1B1" mask="url(#b)">
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconArrowRight;
