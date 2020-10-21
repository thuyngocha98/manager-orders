import * as React from 'react';
import Svg, {Defs, Path, G, Mask, Use} from 'react-native-svg';

function IconWorkOutDated(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Defs>
        <Path
          id="prefix__a"
          d="M6.93 4.344v.586a1.76 1.76 0 001.758 1.758h5.859a1.76 1.76 0 001.758-1.758v-.586h1.172c.969 0 1.757.788 1.757 1.758v14.14c0 .97-.788 1.758-1.757 1.758H5.757A1.76 1.76 0 014 20.242V6.102c0-.97.789-1.758 1.758-1.758H6.93zm4.687 4.765c-2.908 0-5.273 2.366-5.273 5.274s2.365 5.273 5.273 5.273a5.28 5.28 0 005.274-5.273 5.28 5.28 0 00-5.274-5.274zm0 1.172a4.106 4.106 0 014.102 4.102 4.106 4.106 0 01-4.102 4.101 4.106 4.106 0 01-4.101-4.101 4.106 4.106 0 014.101-4.102zm0 1.172a.586.586 0 00-.586.586v2.344c0 .324.262.586.586.586h2.344a.586.586 0 100-1.172h-1.758v-1.758a.586.586 0 00-.586-.586zm0-9.453c.496 0 .94.314 1.106.782l.138.39h1.1c.647 0 1.172.525 1.172 1.172v.586a.587.587 0 01-.586.586h-5.86a.586.586 0 01-.585-.586v-.586c0-.647.524-1.172 1.171-1.172h1.1l.139-.39c.166-.468.61-.782 1.105-.782z"
        />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
        <Mask id="prefix__b" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use fill="#116149" {...props} xlinkHref="#prefix__a" />
        <G fill="#116149" {...props} mask="url(#prefix__b)">
          <Path d="M0 0h24.161v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default IconWorkOutDated;
