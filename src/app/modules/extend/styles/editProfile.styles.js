import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },
  // =========== style header ==========
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(15),
  },
  txtTitleHeader: {
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'bold',
  },
  iconRightHeader: {
    width: responsiveWidth(20),
  },
  viewContent: {
    flex: 1,
  },
  viewAvatar: {
    marginTop: responsiveHeight(30),
    width: responsiveHeight(80),
    height: responsiveHeight(80),
    borderRadius: responsiveHeight(40),
    borderWidth: 2,
    backgroundColor: Colors.gray,
    borderColor: Colors.line,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: responsiveHeight(80),
    height: responsiveHeight(80),
    resizeMode: 'cover',
    borderRadius: responsiveHeight(40),
  },
  avatarAdd: {
    width: responsiveHeight(50),
    height: responsiveHeight(50),
  },
  viewAbsolute: {
    borderTopWidth: 2,
    borderTopColor: Colors.line,
    position: 'absolute',
    width: '100%',
    height: responsiveHeight(70),
    backgroundColor: Colors.white,
    top: responsiveHeight(80),
  },
  txtInfo: {
    marginTop: responsiveHeight(5),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  // ================ style input ==========
  containerInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewTextInput: {
    paddingTop: responsiveHeight(5),
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputLabel: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  inputStyle: {
    paddingVertical: 0,
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    height: responsiveHeight(40),
  },
  txtNotification: {
    color: Colors.tomato,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
export default styles;
