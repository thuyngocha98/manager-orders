import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewItemProcess: {
    width: responsiveWidth(140),
    height: responsiveHeight(145),
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(10),
    flexDirection: 'column',
    //justifyContent: 'center',
  },
  viewIconProcess: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveHeight(50),
    height: responsiveHeight(50),
    borderRadius: responsiveHeight(25),
    alignSelf: 'center',
    backgroundColor: Colors.backgroundIconWorking,
  },
  titleProcess: {
    flex: 1.2,
    marginHorizontal: responsiveWidth(1),
    marginTop: responsiveHeight(5),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleProcess: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    textAlign: 'center',
    color: Colors.txtDark,
  },
  viewNumberData: {
    flex: 1,
    marginTop: responsiveHeight(5),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtNumber1: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.txtDark,
  },
  txtNumber2: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.gray,
  },
  viewProcess: {
    marginTop: responsiveHeight(5),
    height: responsiveHeight(5),
    backgroundColor: Colors.backgroundColorProgress,
    borderRadius: responsiveHeight(2.5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  process: {
    height: responsiveHeight(5),
    width: '100%',
    backgroundColor: Colors.process,
    borderRadius: responsiveHeight(2.5),
  },
});
export default styles;
