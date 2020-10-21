import React from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import styles from '@modules/customer/styles/editAddressCustomer.styles';
import Header from '@components/Header';
import I18n from '@assets/localization/I18n';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import {Hoshi} from 'react-native-textinput-effects';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import {useSelector, useDispatch} from 'react-redux';
import {reduxEditCustomer} from '@actions/customerAction';

const AddressCustomer = ({route, navigation}) => {
  const {address, documentId} = route.params; // params from customer screen
  const [textAddress, setTextAddress] = React.useState(address);
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  const onEditAddressCustomer = async () => {
    Keyboard.dismiss();
    await dispatch(
      reduxEditCustomer({
        userId: user.uid,
        documentId: documentId,
        objectDataEdit: {
          address: textAddress,
        },
      }),
    );
    navigation.navigate('Stack', {
      screen: 'DetailCustomer',
    });
  };
  return (
    <View style={styles.container}>
      {/* view header */}
      <Header>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('editAddress')}</Text>
          <TouchableOpacity onPress={onEditAddressCustomer}>
            <IconCheckMark
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view content */}
      <View style={styles.viewTextInput}>
        <Hoshi
          autoFocus={true}
          value={textAddress}
          onChangeText={text => setTextAddress(text)}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputStyle}
          label={I18n.t('address')}
          style={styles.containerInput}
          borderColor={Colors.lightGreen}
          borderHeight={2}
          inputPadding={responsiveHeight(15)}
          backgroundColor={Colors.white}
        />
      </View>
    </View>
  );
};

export default AddressCustomer;
