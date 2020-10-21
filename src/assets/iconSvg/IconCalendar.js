import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconCalendar(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Defs>
        <Path
          id="a"
          d="M19.656 20.438H4.344a.783.783 0 01-.782-.782V9.344h16.875v10.312c0 .431-.35.782-.78.782zM4.344 5.124h.937v1.563h1.563V5.125h10.312v1.563h1.563V5.125h.937c.431 0 .782.35.782.781v1.875H3.563V5.906c0-.43.35-.781.78-.781zm15.312-1.563h-.937V2h-1.563v1.563H6.844V2H5.28v1.563h-.937A2.343 2.343 0 002 5.905v13.75A2.346 2.346 0 004.344 22h15.312A2.345 2.345 0 0022 19.656V5.906a2.346 2.346 0 00-2.344-2.343z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
        <Mask id="b" fill="#fff" {...props}>
          <Use xlinkHref="#a" />
        </Mask>
        <Use fill="#98A1B1" xlinkHref="#a" {...props} />
        <G fill="#98A1B1" mask="url(#b)" {...props}>
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconCalendar;
