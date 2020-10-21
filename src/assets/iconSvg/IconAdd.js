import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Path,
  G,
  Mask,
  Use,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function IconAdd(props) {
  return (
    <Svg width={50} height={50} viewBox="0 0 50 50" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__c"
          x1="11.338%"
          x2="100%"
          y1="15.117%"
          y2="99.338%">
          <Stop offset="0%" stopColor="#FFB713" />
          <Stop offset="100%" stopColor="#F60" />
        </LinearGradient>
        <Circle id="prefix__a" cx={20} cy={20} r={20} />
        <Path
          id="prefix__e"
          d="M10 0c.789 0 1.429.64 1.429 1.429l-.001 7.142h7.143a1.429 1.429 0 110 2.858l-7.143-.001v7.143a1.428 1.428 0 11-2.857 0v-7.143H1.429a1.43 1.43 0 010-2.857H8.57V1.429A1.43 1.43 0 0110 0z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(5 3)">
        <Mask id="prefix__d" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use fill="#000" filter="url(#prefix__b)" xlinkHref="#prefix__a" />
        <Use fill="#D8D8D8" xlinkHref="#prefix__a" />
        <G fill="url(#prefix__c)" mask="url(#prefix__d)">
          <Path d="M0 0h40.268v40H0z" />
        </G>
        <G mask="url(#prefix__d)">
          <G transform="translate(10 10)">
            <Mask id="prefix__f" fill="#fff">
              <Use xlinkHref="#prefix__e" />
            </Mask>
            <Use fill="#0C66FF" xlinkHref="#prefix__e" />
            <G mask="url(#prefix__f)">
              <Path fill="#FFF" d="M-2-2h24.161v24H-2z" />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default IconAdd;
