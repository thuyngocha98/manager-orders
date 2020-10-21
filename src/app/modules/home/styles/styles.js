import {StyleSheet, Platform} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: responsiveHeight(15),
      },
      android: {
        marginTop: 0,
      },
    }),
    flex: 1,
    flexDirection: 'column',
  },
  modalContainer: {
    marginTop: responsiveHeight(200),
    height: responsiveHeight(120),
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: Colors.backgroundModal,
    borderRadius: 8,
    fontSize: 19,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  viewBtn: {
    marginTop: 10,
    flexDirection: 'row',
  },
  inputModel: {
    width: 300,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  txtModel: {
    textAlign: 'center',
  },
  viewCancel: {
    flex: 1,
  },
  viewInput: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  input: {
    flex: 4,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    fontSize: 20,
  },
  btnAdd: {
    flex: 1.3,
    backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  txtAdd: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Colors.white,
  },
  viewFlatList: {
    flex: 1,
    marginHorizontal: 20,
  },
  viewTxt: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  txt: {
    flex: 5,
    marginVertical: 10,
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },
  btnGet: {
    backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtGet: {
    fontSize: Fonts.size.h2,
    color: Colors.white,
    marginHorizontal: 15,
    marginVertical: responsiveWidth(10),
  },
  viewDel: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtDel: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,
  },

  // ==================== Setting ===============
});
export default styles;
