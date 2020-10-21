import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import Fonts from '@const/Fonts';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    paddingTop: getStatusBarHeight(),
  },
  viewGoBack: {
    marginLeft: responsiveWidth(15),
    marginTop: responsiveHeight(10),
  },
  btnGoBack: {
    padding: responsiveHeight(5),
    width: responsiveWidth(35),
  },
  viewLogo: {
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(200),
    height: responsiveHeight(150),
    backgroundColor: Colors.gray,
  },
  viewInput: {
    paddingHorizontal: responsiveWidth(20),
    paddingTop: responsiveHeight(20),
  },
  viewInputPhoneNumber: {
    marginTop: responsiveHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.line,
  },
  viewIcon: {
    marginLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(10),
  },
  inputPhone: {
    flex: 1,
    padding: 0,
    fontFamily: Fonts.type.medium,
    fontWeight: 'normal',
    fontSize: Fonts.size.text,
    color: Colors.txtDark,
  },
  // =============== style button ===========
  viewButton: {
    marginTop: responsiveHeight(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGreen,
    width: responsiveWidth(340),
    paddingVertical: responsiveHeight(20),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtBtn: {
    fontFamily: Fonts.type.medium,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: Fonts.size.giant,
    color: Colors.white,
  },
  viewContentInput: {
    flex: 1,
    marginLeft: responsiveWidth(10),
  },
  titleInputPhone: {
    marginTop: responsiveHeight(-10),
    fontFamily: Fonts.type.medium,
    fontWeight: 'normal',
    fontSize: Fonts.size.tiny,
    color: Colors.gray,
  },
  txtNote: {
    marginTop: responsiveHeight(15),
    marginHorizontal: responsiveWidth(20),
    textAlign: 'center',
    fontFamily: Fonts.type.medium,
    fontWeight: 'normal',
    fontSize: Fonts.size.tiny,
    color: Colors.gray,
  },
  isValidPhoneNumber: {
    fontFamily: Fonts.type.medium,
    fontWeight: 'normal',
    fontSize: Fonts.size.tiny,
    color: Colors.tomato,
  },
});
export default styles;
