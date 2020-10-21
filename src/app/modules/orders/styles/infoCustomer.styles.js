import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  // ============ style info customer ==============
  viewDetailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAvatar: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    overflow: 'hidden',
    borderRadius: responsiveHeight(30),
  },
  avatar: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    resizeMode: 'cover',
  },
  viewTextInfo: {
    flex: 1,
    flexDirection: 'column',
    marginTop: responsiveHeight(5),
  },
  txtInfo: {
    marginTop: responsiveHeight(5),
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium,
    fontWeight: 'normal',
    color: Colors.txtDark,
  },
});
export default styles;
