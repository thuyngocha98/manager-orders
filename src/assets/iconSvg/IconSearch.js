import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconSearch(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Defs>
        <Path
          id="a"
          d="M10.5 2a8.5 8.5 0 016.677 13.761l4.53 4.532a1 1 0 01-1.414 1.414l-4.532-4.53A8.5 8.5 0 1110.5 2zm0 2a6.5 6.5 0 104.548 11.144l.045-.051a.716.716 0 01.05-.046A6.5 6.5 0 0010.5 4z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
        <Mask id="b" fill="#ffffff">
          <Use xlinkHref="#a" />
        </Mask>
        <Use fill="#FFFFFF" xlinkHref="#a" {...props} />
        <G fill="#FFFFFF" mask="url(#b)" {...props}>
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconSearch;
