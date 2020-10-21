import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconCheckMark(props) {
  return (
    <Svg
      width="78.369px"
      height="78.369px"
      viewBox="0 0 78.369 78.369"
      {...props}>
      <Path
        fill="#116149"
        {...props}
        d="M78.049 19.015L29.458 67.606a1.094 1.094 0 01-1.548 0L.32 40.015a1.094 1.094 0 010-1.547l6.704-6.704a1.095 1.095 0 011.548 0l20.113 20.112 41.113-41.113a1.095 1.095 0 011.548 0l6.703 6.704a1.094 1.094 0 010 1.548z"
      />
    </Svg>
  );
}

export default IconCheckMark;
