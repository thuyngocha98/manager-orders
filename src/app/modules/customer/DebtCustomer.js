import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Platform,
} from 'react-native';
import styles from '@modules/customer/styles/debtCustomer.styles';
import Header from '@components/Header';
import I18n from '@assets/localization/I18n';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import IconCalendar from '@assets/iconSvg/IconCalendar';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import SearchBase from '@components/SearchBase';
import Button from '@components/Button';
import BottomModalBase from '@components/BottomModalBase';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconArrowLeft from '@assets/iconSvg/IconArrowLeft';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {getStatusOrderInTransaction} from '@services/firebase/order';
import number2money from '@utils/NumberToMoney';
import {useSelector} from 'react-redux';
import moment from 'moment';
import ItemYear from '@components/ItemYear';
import 'moment/locale/vi';
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

const initYear = 2000;
const currentYear = Number(new Date().getFullYear());
const years = Array(currentYear - initYear)
  .fill()
  .map((v, i) => currentYear - i);
const DebtCustomer = ({route, navigation}) => {
  const {documentId} = route.params;
  const now = moment().utcOffset(7);
  const currentDay = now.format('YYYY-MM-DD');
  const firstDayOfMonth = now.startOf('month').format('YYYY-MM-DD');
  const [mainStartDay, setMainStartDay] = React.useState('2020-07-01');
  const [mainEndDay, setMainEndDay] = React.useState('2020-07-05');
  const [startDay, setStartDay] = React.useState(firstDayOfMonth);
  const [endDay, setEndDay] = React.useState(currentDay);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [year, setYear] = React.useState(currentDay);
  const [enableSelectYear, setEnableSelectYear] = React.useState(false);
  const [listDebtCustomer, setListDebtCustomer] = React.useState([]);
  const [textSearch, setTextSearch] = React.useState('');
  const [listDebtFilter, setListDebtFilter] = React.useState([]);
  const {user} = useSelector(states => ({user: states.auth.user}));

  React.useEffect(() => {
    const getListDebt = async () => {
      let listDebt = await getStatusOrderInTransaction(user.uid, documentId);
      setListDebtCustomer(listDebt);
      setListDebtFilter(listDebt);
    };
    getListDebt();
  }, [documentId, user.uid]);

  const onSelectYear = item => {
    setYear(`${item}-08-01`);
    setEnableSelectYear(!enableSelectYear);
  };

  const RenderItemYear = ({item}) => (
    <ItemYear item={item} onSelectYear={onSelectYear} />
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressDone = () => {
    if (startDay && endDay) {
      setMainStartDay(startDay);
      setMainEndDay(endDay);
      toggleModal();
    }
  };

  const onPressDay = day => {
    if (startDay === null) {
      setStartDay(day.dateString);
    } else if (endDay === null) {
      if (moment(startDay).isAfter(day.dateString, 'day')) {
        setStartDay(day.dateString);
      } else {
        setEndDay(day.dateString);
      }
    } else {
      setEndDay(null);
      setStartDay(day.dateString);
    }
  };

  const ItemDebtCustomer = React.memo(({item}) => {
    let date = moment(item.createAt)
      .utcOffset(7)
      .format('DD/MM/YYYY HH:mm:ss');
    return (
      <View style={styles.viewItem}>
        <View style={styles.viewLine}>
          <Text style={styles.txtHeader}>{item.orderCode}</Text>
          <Text style={[styles.txtDesc, {color: Colors.orange}]}>
            {number2money(item.totalOrder)}
          </Text>
        </View>
        <View style={styles.viewLine}>
          <Text style={styles.txtDesc}>{date}</Text>
        </View>
      </View>
    );
  });

  const RenderItem = ({item}) => <ItemDebtCustomer item={item} />;

  const onFilterSearch = async text => {
    setTextSearch(text);
    const newData = await listDebtCustomer.filter(order => {
      const orderCode = order.orderCode.toUpperCase();
      const textData = text.toUpperCase();
      return orderCode.indexOf(textData) > -1;
    });
    setListDebtFilter(newData);
  };

  return (
    <View style={styles.container}>
      {/* view modal picker calendar */}
      <BottomModalBase isModalVisible={isModalVisible}>
        {!enableSelectYear ? (
          <View>
            <View style={styles.viewCalendar}>
              <Calendar
                current={year}
                maxDate={currentDay}
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
                onDayPress={day => onPressDay(day)}
                markedDates={{
                  [startDay]: {
                    selected: true,
                    marked: true,
                    dotColor: 'white',
                    color: Colors.darkGreen,
                    textColor: 'white',
                  },
                  [endDay]: {
                    selected: true,
                    marked: true,
                    dotColor: 'white',
                    color: Colors.darkGreen,
                    textColor: 'white',
                  },
                }}
              />
            </View>
            <View style={styles.viewBtnChoose}>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.viewBtnCancel}>
                <Text style={styles.btnCancel}>{I18n.t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressDone}>
                <Button title={I18n.t('done')} type={0} width={97} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.viewSelectYear}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={years}
              renderItem={RenderItemYear}
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
      <Header>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('debt')}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <IconCalendar
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view search */}
      <SearchBase
        placeholder={I18n.t('search')}
        onChangeText={text => onFilterSearch(text)}
        value={textSearch}
        text={textSearch}
        onClear={() => onFilterSearch('')}
      />
      <View style={styles.viewTitle}>
        <Text style={styles.txtTitleDebt}>
          {I18n.t('currentDebt')}:{' '}
          {number2money(
            listDebtFilter.reduce(
              (acc, cur) => acc + parseInt(cur.totalOrder, 10),
              0,
            ),
          )}
        </Text>
      </View>
      {/* view list */}
      <KeyboardAvoidingView
        style={styles.viewListItem}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FlatList
          data={listDebtFilter}
          renderItem={RenderItem}
          keyExtractor={item => item.orderCode.toString()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default DebtCustomer;
