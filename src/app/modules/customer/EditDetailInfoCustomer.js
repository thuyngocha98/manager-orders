import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
} from 'react-native';
import styles from '@modules/customer/styles/editDetailInfoCustomer.styles';
import Header from '@components/Header';
import I18n from '@assets/localization/I18n';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import Colors from '@const/Colors';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconArrowLeft from '@assets/iconSvg/IconArrowLeft';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import {Hoshi} from 'react-native-textinput-effects';
import CheckBoxBase from '@components/CheckBoxBase';
import IconCalendar from '@assets/iconSvg/IconCalendar';
import BottomModalBase from '@components/BottomModalBase';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import ItemYear from '@components/ItemYear';
import {useSelector, useDispatch} from 'react-redux';
import {reduxEditCustomer} from '@actions/customerAction';

// setup calendar
LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1,',
    'Tháng 2,',
    'Tháng 3,',
    'Tháng 4,',
    'Tháng 5,',
    'Tháng 6,',
    'Tháng 7,',
    'Tháng 8,',
    'Tháng 9,',
    'Tháng 10,',
    'Tháng 11,',
    'Tháng 12,',
  ],
  monthNamesShort: [
    'Tháng 1,',
    'Tháng 2,',
    'Tháng 3,',
    'Tháng 4,',
    'Tháng 5,',
    'Tháng 6,',
    'Tháng 7,',
    'Tháng 8,',
    'Tháng 9,',
    'Tháng 10,',
    'Tháng 11,',
    'Tháng 12,',
  ],
  dayNames: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

const initYear = 1950;
const currentYear = Number(new Date().getFullYear());
const years = Array(currentYear - initYear)
  .fill()
  .map((v, i) => currentYear - i - 5);
const EditDetailInfoCustomer = ({route, navigation}) => {
  const {data, documentId} = route.params;
  const [stateInfo, setStateInfo] = React.useState({
    name: data.name,
    phone: data.phone,
    email: data.email,
    dayOfBirth: data.dayOfBirth,
    sex: data.gender,
  });
  const [isModalVisibleCalendar, setModalVisibleCalendar] = React.useState(
    false,
  );
  const [year, setYear] = React.useState('2000-08-01');
  const [enableSelectYear, setEnableSelectYear] = React.useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  // function set show hide modal
  const toggleModalCalendar = () => {
    setModalVisibleCalendar(!isModalVisibleCalendar);
  };

  const onSetStateInfo = (field, info) => {
    setStateInfo({
      ...stateInfo,
      [field]: info,
    });
  };

  const onSelectYear = item => {
    setYear(`${item}-08-01`);
    setEnableSelectYear(!enableSelectYear);
  };

  const RenderItem = ({item}) => (
    <ItemYear item={item} onSelectYear={onSelectYear} />
  );

  const onEditDetailCustomer = async () => {
    await Keyboard.dismiss();
    await dispatch(
      reduxEditCustomer({
        userId: user.uid,
        documentId: documentId,
        objectDataEdit: {
          name: stateInfo.name,
          phone: stateInfo.phone,
          email: stateInfo.email,
          dayOfBirth: stateInfo.dayOfBirth,
          gender: stateInfo.sex,
        },
      }),
    );
    navigation.navigate('Stack', {
      screen: 'DetailCustomer',
    });
  };

  return (
    <View style={styles.container}>
      {/* view modal select dayOfBirth */}
      <BottomModalBase
        onBackButtonPress={toggleModalCalendar}
        toggleModal={toggleModalCalendar}
        isModalVisible={isModalVisibleCalendar}>
        {!enableSelectYear ? (
          <View style={styles.viewCalendar}>
            <Calendar
              current={year}
              maxDate={new Date()}
              renderArrow={direction =>
                direction === 'right' ? (
                  <IconArrowRight
                    width={responsiveWidth(12)}
                    height={responsiveHeight(17)}
                  />
                ) : (
                  <IconArrowLeft
                    width={responsiveWidth(12)}
                    height={responsiveHeight(17)}
                  />
                )
              }
              onDayPress={day => onSetStateInfo('dayOfBirth', day.dateString)}
              markedDates={{
                [stateInfo.dayOfBirth]: {
                  selected: true,
                  marked: true,
                  dotColor: 'white',
                  color: Colors.darkGreen,
                  textColor: 'white',
                },
              }}
            />
          </View>
        ) : (
          <View style={styles.viewSelectYear}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={years}
              renderItem={RenderItem}
              keyExtractor={item => item.toString()}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.viewHeaderCalendar}
          onPress={() => setEnableSelectYear(!enableSelectYear)}>
          {enableSelectYear && (
            <Text style={styles.txtTitleYear}>
              {enableSelectYear ? I18n.t('selectYear') : ''}
            </Text>
          )}
        </TouchableOpacity>
      </BottomModalBase>
      {/* view header */}
      <Header>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('editInformation')}</Text>
          <TouchableOpacity onPress={onEditDetailCustomer}>
            <IconCheckMark
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view content */}
      <KeyboardAvoidingView
        style={styles.viewContent}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.viewTextInput}>
            <Hoshi
              onChangeText={text => onSetStateInfo('name', text)}
              value={stateInfo.name}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              label={I18n.t('fullName')}
              style={styles.containerInput}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          {/* view dayOfBirth */}
          <TouchableOpacity
            onPress={toggleModalCalendar}
            style={styles.viewDayOfBirth}>
            <View>
              <Text style={styles.txtLabel}>{I18n.t('dayOfBirth')}</Text>

              <Text
                style={[
                  styles.txtDayOfBirth,
                  {
                    color: stateInfo.dayOfBirth ? Colors.txtDark : Colors.gray,
                  },
                ]}>
                {stateInfo.dayOfBirth ? stateInfo.dayOfBirth : '00/00/0000'}
              </Text>
            </View>
            <IconCalendar
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>
          {/* view select sex */}
          <View style={styles.viewLabel}>
            <Text style={styles.txtLabel}>{I18n.t('sex')}</Text>
            <View style={styles.viewCheckSex}>
              <TouchableOpacity
                onPress={() => onSetStateInfo('sex', true)}
                style={styles.checkSex}>
                <CheckBoxBase
                  onPress={() => onSetStateInfo('sex', true)}
                  isChecked={stateInfo.sex}
                />
                <Text style={styles.txtSex}>{I18n.t('male')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSetStateInfo('sex', false)}
                style={styles.checkSex}>
                <CheckBoxBase
                  onPress={() => onSetStateInfo('sex', false)}
                  isChecked={stateInfo.sex == null ? false : !stateInfo.sex}
                />
                <Text style={styles.txtSex}>{I18n.t('female')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.titleContact}>
            {I18n.t('contactInformation').toUpperCase()}
          </Text>
          <View style={styles.viewTextInput}>
            <Hoshi
              onChangeText={text => onSetStateInfo('phone', text)}
              value={stateInfo.phone}
              keyboardType="numeric"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              label={I18n.t('phoneNumber')}
              style={styles.containerInput}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          <View style={styles.viewTextInput}>
            <Hoshi
              onChangeText={text => onSetStateInfo('email', text)}
              value={stateInfo.email}
              keyboardType="email-address"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              label={I18n.t('email')}
              style={styles.containerInput}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditDetailInfoCustomer;
