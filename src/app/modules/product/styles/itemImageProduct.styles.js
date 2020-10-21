import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
const styles = StyleSheet.create({
  viewImageItem: {
    marginRight: responsiveWidth(15),
  },
  listItemImage: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageAdd: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    borderRadius: 8,
    resizeMode: 'stretch',
    tintColor: Colors.gray,
  },
  viewImage: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageItem: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    resizeMode: 'stretch',
  },
  viewLoading: {
    position: 'absolute',
    top: responsiveHeight(20),
    left: responsiveHeight(20),
  },
  viewDeleteImage: {
    zIndex: 1,
    position: 'absolute',
    top: -responsiveHeight(9),
    right: -responsiveHeight(9),
    width: responsiveHeight(18),
    height: responsiveHeight(18),
    borderRadius: responsiveHeight(9),
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
