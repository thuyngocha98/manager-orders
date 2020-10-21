import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  contentBox: {
    flexDirection: 'column',
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewLeftItemBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewIconLeftItemBox: {
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(5),
  },
  txtItemBox: {
    flex: 1,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    color: Colors.txtDark,
  },
  viewRightItemBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  txtRightItemBox: {
    flex: 1,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium,
    color: Colors.txtDark,
    textAlign: 'right',
  },
  viewIconRightItemBox: {
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  line: {
    height: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.line,
    marginVertical: responsiveHeight(15),
  },
  viewTotal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: responsiveHeight(15),
    marginHorizontal: responsiveWidth(15),
  },
  txtTotal: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    color: Colors.txtDark,
  },
  txtNumberTotal: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    color: Colors.lightGreen,
    marginLeft: responsiveWidth(5),
  },
});
export default styles;
