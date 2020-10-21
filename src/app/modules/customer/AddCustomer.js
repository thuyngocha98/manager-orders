import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '@modules/customer/styles/addCustomer.styles';
import Header from '@components/Header';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import I18n from '@assets/localization/I18n';
import IconCalendar from '@assets/iconSvg/IconCalendar';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconArrowLeft from '@assets/iconSvg/IconArrowLeft';
import IconArrowUp from '@assets/iconSvg/IconArrowUp';
import BottomModalBase from '@components/BottomModalBase';
import {Hoshi} from 'react-native-textinput-effects';
import CheckBoxBase from '@components/CheckBoxBase';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import ItemYear from '@components/ItemYear';
import uuidv4 from '@utils/Uuidv4Utils';
import {useSelector, useDispatch} from 'react-redux';
import {reduxAddCustomer} from '@actions/customerAction';
import moment from 'moment';
import 'moment/locale/vi';
// set locale vn
moment.locale('vi');
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
const AddCustomer = ({navigation}) => {
  const [selectAddInfo, setSelectAddInfo] = React.useState(false);
  const [isModalVisibleCalendar, setModalVisibleCalendar] = React.useState(
    false,
  );
  const [year, setYear] = React.useState('2000-08-01');
  const [enableSelectYear, setEnableSelectYear] = React.useState(false);
  const [stateInfo, setStateInfo] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    dayOfBirth: '',
    sex: null,
    note: '',
  });
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  const onSetStateInfo = (field, info) => {
    setStateInfo({
      ...stateInfo,
      [field]: info,
    });
  };

  // function set show hide modal
  const toggleModalCalendar = () => {
    setModalVisibleCalendar(!isModalVisibleCalendar);
  };

  const onSelectYear = item => {
    setYear(`${item}-08-01`);
    setEnableSelectYear(!enableSelectYear);
  };

  const RenderItem = ({item}) => (
    <ItemYear item={item} onSelectYear={onSelectYear} />
  );

  const onAddCustomer = async () => {
    Keyboard.dismiss();
    const time = moment()
      .utcOffset(7)
      .format('x');
    let documentId = uuidv4();
    await dispatch(
      reduxAddCustomer({
        userId: user.uid,
        documentId: documentId,
        data: {
          name: stateInfo.name,
          phone: stateInfo.phone,
          email: stateInfo.email,
          address: stateInfo.address,
          dayOfBirth: stateInfo.dayOfBirth,
          gender: stateInfo.sex,
          note: stateInfo.note,
          orderStatus: '',
          createAt: parseInt(time, 10),
        },
      }),
    );
    navigation.navigate('MyTabs', {screen: 'Customer'});
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
          <Text style={styles.txtTitleHeader}>{I18n.t('addCustomer')}</Text>
          <TouchableOpacity onPress={onAddCustomer}>
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
              value={stateInfo.name}
              onChangeText={text => onSetStateInfo('name', text)}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              label={I18n.t('customerName')}
              style={styles.containerInput}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          <View style={styles.viewTextInput}>
            <Hoshi
              value={stateInfo.phone}
              onChangeText={text => onSetStateInfo('phone', text)}
              keyboardType="numeric"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              style={styles.containerInput}
              label={I18n.t('phoneNumber')}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          <View style={styles.viewTextInput}>
            <Hoshi
              value={stateInfo.email}
              onChangeText={text => onSetStateInfo('email', text)}
              keyboardType="email-address"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              style={styles.containerInput}
              label={I18n.t('email')}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          <View style={styles.viewTextInput}>
            <Hoshi
              value={stateInfo.address}
              onChangeText={text => onSetStateInfo('address', text)}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              style={styles.containerInput}
              label={I18n.t('address')}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          <View style={styles.viewTextInput}>
            <Hoshi
              value={stateInfo.note}
              onChangeText={text => onSetStateInfo('note', text)}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              style={styles.containerInput}
              label={I18n.t('note')}
              borderColor={Colors.lightGreen}
              borderHeight={2}
              inputPadding={responsiveHeight(15)}
              backgroundColor={Colors.white}
            />
          </View>
          <TouchableOpacity
            onPress={() => setSelectAddInfo(!selectAddInfo)}
            style={styles.viewNote}>
            <View>
              <Text style={styles.txtAddNoteTitle}>
                {I18n.t('moreInformation')}
              </Text>
              <Text style={styles.txtAddNoteDesc}>
                {I18n.t('dayOfBirth')}, {I18n.t('sex')}
              </Text>
            </View>
            <View
              style={
                selectAddInfo
                  ? null
                  : {
                      transform: [{rotate: '180deg'}],
                    }
              }>
              <IconArrowUp
                width={responsiveHeight(18)}
                height={responsiveHeight(18)}
              />
            </View>
          </TouchableOpacity>
          {selectAddInfo ? (
            <View>
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
                        color: stateInfo.dayOfBirth
                          ? Colors.txtDark
                          : Colors.gray,
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
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddCustomer;
