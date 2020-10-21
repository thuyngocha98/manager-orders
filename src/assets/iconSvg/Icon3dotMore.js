import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Icon3dotMore(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 60 60" {...props}>
      <Path
        fill="#FFFFFF"
        {...props}
        d="M30 16c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zM30 44c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM30 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"
      />
    </Svg>
  );
}

export default Icon3dotMore;
