import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StatusBar,
  Keyboard,
} from 'react-native';
import styles from '@modules/auth/styles/login.styles';
import auth from '@react-native-firebase/auth';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import IconPhone from '@assets/iconSvg/IconPhone';
import IconShield from '@assets/iconSvg/IconShield';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';

export default function LogIn({navigation}) {
  const [phoneNumber, setPhoneNumber] = React.useState('+84');
  const [code, setCode] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const [isValidPhoneNumber, setValidPhoneNumber] = React.useState(true);
  const [isValidCode, setValidCode] = React.useState(true);
  const inputCodeRef = React.useRef(null);
  const signInWithPhoneNumber = async PhoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(PhoneNumber);
    setConfirm(confirmation);
    inputCodeRef.current.focus();
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      Keyboard.dismiss();
    } catch (error) {
      setValidCode(false);
      console.log(error.code);
    }
  };

  const onSubmit = () => {
    if (!confirm) {
      if (phoneNumber.length !== 12) {
        setValidPhoneNumber(false);
        return;
      } else {
        setValidPhoneNumber(true);
        signInWithPhoneNumber(phoneNumber);
      }
    } else {
      if (code.length !== 6) {
        setValidCode(false);
        return;
      } else {
        confirmCode();
      }
    }
  };

  const onChangePhoneNumber = PhoneNumber => {
    setConfirm(null);
    setValidCode(true);
    setPhoneNumber(PhoneNumber);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white}
        translucent
        barStyle="dark-content"
      />
      <View style={styles.viewGoBack}>
        <TouchableOpacity
          style={styles.btnGoBack}
          onPress={() => navigation.goBack()}>
          <IconGoBackArrow
            width={responsiveWidth(20)}
            height={responsiveHeight(20)}
            fill={Colors.gray}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewLogo}>
        <View style={styles.logo}>
          <Text>Logo</Text>
        </View>
      </View>
      <View style={styles.viewInput}>
        <View style={styles.viewInputPhoneNumber}>
          <View style={styles.viewIcon}>
            <IconPhone
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.gray}
            />
          </View>
          <View style={styles.viewContentInput}>
            <Text style={styles.titleInputPhone}>{I18n.t('phoneNumber')}</Text>
            <TextInput
              value={phoneNumber}
              autoFocus
              onChangeText={text =>
                onChangePhoneNumber(text.replace(/[^0-9+]/g, ''))
              }
              maxLength={12}
              keyboardType="decimal-pad"
              style={styles.inputPhone}
              placeholder={I18n.t('phoneNumber')}
            />
          </View>
        </View>
        {!isValidPhoneNumber && (
          <Text style={styles.isValidPhoneNumber}>
            {I18n.t('invalidPhoneNumberPleaseCheckAgain')}
          </Text>
        )}
        {confirm && (
          <View style={styles.viewInputPhoneNumber}>
            <View style={styles.viewIcon}>
              <IconShield
                width={responsiveWidth(20)}
                height={responsiveHeight(20)}
                fill={Colors.gray}
              />
            </View>
            <View style={styles.viewContentInput}>
              <Text style={styles.titleInputPhone}>{I18n.t('verifyCode')}</Text>
              <TextInput
                ref={inputCodeRef}
                value={code}
                onChangeText={text => setCode(text.replace(/[^0-9+]/g, ''))}
                maxLength={6}
                keyboardType="decimal-pad"
                style={styles.inputPhone}
              />
            </View>
          </View>
        )}
        {!isValidCode && (
          <Text style={styles.isValidPhoneNumber}>
            {I18n.t('invalidVerifyCodePleaseCheckAgain')}
          </Text>
        )}
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity onPress={onSubmit} style={styles.btn}>
          <Text style={styles.txtBtn}>
            {!confirm ? I18n.t('verifyPhoneNumber') : I18n.t('login')}
          </Text>
        </TouchableOpacity>
      </View>
      {!confirm ? (
        <Text style={styles.txtNote}>
          {I18n.t('textGuidVerifyPhoneNumber')}
        </Text>
      ) : (
        <Text style={styles.txtNote}>{I18n.t('textGuidVerifyCode')}</Text>
      )}
    </View>
  );
}
