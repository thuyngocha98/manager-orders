import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from '@modules/home/styles/dashboard.styles';
import IconSearch from '@assets/iconSvg/IconSearch';
import IconNotification from '@assets/iconSvg/IconNotification';
import IconCalendar from '@assets/iconSvg/IconCalendar';
import IconUser from '@assets/iconSvg/IconUser';
import IconBill from '@assets/iconSvg/IconBill';
import IconApprove from '@assets/iconSvg/IconApprove';
import IconWorkOutDated from '@assets/iconSvg/IconWorkOutDated';
import {responsiveWidth, responsiveHeight} from '@utils/DimenUtils';
import ItemProcess from '@modules/home/components/ItemProcess';
import ItemRowDashboard from '@modules/home/components/ItemRowDashboard';
import Header from '@components/Header';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconArrowLeft from '@assets/iconSvg/IconArrowLeft';
import Colors from '@const/Colors';
import Button from '@components/Button';
import I18n from '@assets/localization/I18n';
import BottomModalBase from '@components/BottomModalBase';
import {useSelector} from 'react-redux';
import number2money from '@utils/NumberToMoney';
import moment from 'moment';
import ItemYear from '@components/ItemYear';
import 'moment/locale/vi';
import IconCancelOrders from '@assets/iconSvg/IconCancelOrders';
import IconComplete from '@assets/iconSvg/IconComplete';
import IconTransaction from '@assets/iconSvg/IconTransaction';
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

const initYear = 2000;
const currentYear = Number(new Date().getFullYear());
const years = Array(currentYear - initYear)
  .fill()
  .map((v, i) => currentYear - i);
export default function Dashboard({navigation}) {
  const {listOrders} = useSelector(states => ({
    listOrders: states.order.listOrders,
  }));
  const {user} = useSelector(states => ({user: states.auth.user}));
  const now = moment().utcOffset(7);
  const currentDay = now.format('YYYY-MM-DD');
  const firstDayOfMonth = now.startOf('month').format('YYYY-MM-DD');
  const [mainStartDay, setMainStartDay] = React.useState(firstDayOfMonth);
  const [mainEndDay, setMainEndDay] = React.useState(currentDay);
  const [startDay, setStartDay] = React.useState(firstDayOfMonth);
  const [endDay, setEndDay] = React.useState(currentDay);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [year, setYear] = React.useState(currentDay);
  const [enableSelectYear, setEnableSelectYear] = React.useState(false);
  const [stateOrders, setStateOrders] = React.useState({
    listInTransaction: [],
    listComplete: [],
    listCancel: [],
  });
  const [ordersByTime, setOrdersByTime] = React.useState({
    revenue: 0,
    cost: 0,
    debt: 0,
  });

  React.useEffect(() => {
    const divideData = async () => {
      var listInTransaction = [];
      var listComplete = [];
      var listCancel = [];
      listOrders.map(order => {
        if (order.statusOrder === 'inTransaction') {
          listInTransaction.push(order);
        } else if (order.statusOrder === 'complete') {
          listComplete.push(order);
        } else {
          listCancel.push(order);
        }
      });
      setStateOrders({
        listInTransaction: listInTransaction,
        listComplete: listComplete,
        listCancel: listCancel,
      });
    };
    divideData();
  }, [listOrders]);

  React.useEffect(() => {
    const getDataOrdersByTime = async () => {
      let start = moment(mainStartDay).format('x');
      let end = parseInt(moment(mainEndDay).format('x'), 10) + 100000000;
      let revenue = 0;
      let cost = 0;
      let debt = 0;
      listOrders.map(order => {
        if (order.createAt >= start && order.createAt <= end) {
          if (order.statusOrder === 'complete') {
            revenue += parseInt(order.totalOrder, 10);
            cost += order.costOrder;
          } else if (order.statusOrder === 'inTransaction') {
            debt += parseInt(order.totalOrder, 10);
            cost += order.costOrder;
          }
        }
      });
      setOrdersByTime({revenue: revenue, cost: cost, debt: debt});
    };
    getDataOrdersByTime();
  }, [listOrders, mainEndDay, mainStartDay]);

  const onSelectYear = item => {
    setYear(`${item}-08-01`);
    setEnableSelectYear(!enableSelectYear);
  };

  const RenderItem = ({item}) => (
    <ItemYear item={item} onSelectYear={onSelectYear} />
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const formatDay = day => {
    if (day) {
      let tmp = day?.split('-');
      return tmp[2] + '/' + tmp[1] + '/' + tmp[0];
    }
  };

  const onPressDone = async () => {
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

  const getCurrentDay = () => {
    const nowDate = moment().utcOffset(7);
    const dow = nowDate.format('dddd');
    const dayOfWeek = dow.charAt(0).toUpperCase() + dow.slice(1);
    const fullDate = nowDate.format('L');
    return dayOfWeek + ', ' + fullDate;
  };

  const onCalculatorDebt = () => {
    let debt = stateOrders.listInTransaction.reduce(
      (acc, cur) => acc + parseInt(cur.totalOrder, 10),
      0,
    );
    let txtDebt = `0 ${I18n.t('thousand')}`;
    if (debt.toString().length <= 6) {
      txtDebt = debt / 1000 + ` ${I18n.t('thousand')}`;
    } else if (debt.toString().length <= 9 && debt.toString().length > 6) {
      txtDebt = debt / 1000000 + ` ${I18n.t('million')}`;
    } else {
      txtDebt = debt / 1000000000 + ` ${I18n.t('billion')}`;
    }
    return txtDebt;
  };

  const onTotalMoney = () => {
    let money = ordersByTime.revenue - ordersByTime.cost;
    return money;
  };

  return (
    <ScrollView style={styles.container}>
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
      {/* container header */}
      <View style={styles.containerHeader}>
        <Image
          source={require('@assets/images/background3x.png')}
          style={styles.backgroundImage}
        />
        {/* view header */}
        <Header>
          <View style={styles.headerMenu}>
            {/* icon avatar */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Stack', {screen: 'Profile'});
              }}
              style={styles.viewAvatar}>
              <View style={styles.viewAbsoluteAvatar}>
                <IconUser
                  width={responsiveHeight(30)}
                  height={responsiveHeight(30)}
                />
              </View>
              {user?.photoURL && (
                <Image source={{uri: user?.photoURL}} style={styles.avatar} />
              )}
            </TouchableOpacity>
            <View style={styles.viewIconRightHeader}>
              {/* icon search */}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {}}
                style={styles.viewIcon}>
                <IconSearch
                  width={responsiveWidth(17)}
                  height={responsiveHeight(17)}
                />
              </TouchableOpacity>
              {/* icon notification */}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('Stack', {screen: 'Notification'})
                }
                style={styles.viewIconNotification}>
                <IconNotification
                  width={responsiveHeight(14.2)}
                  height={responsiveHeight(16.7)}
                />
                <View style={styles.viewNumberNotification}>
                  <Text style={styles.txtNumberNotification}>10</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Header>
        {/* view name and time */}
        <View style={styles.viewTitleAndTime}>
          <View style={styles.titleAndTime}>
            <Text style={styles.txtTitle}>
              {I18n.t('welcome')}{' '}
              {user?.displayName ? user.displayName.split(' ').pop() : 'Thuong'}
            </Text>
            <Text style={styles.txtTime}>{getCurrentDay()}</Text>
          </View>
        </View>
        {/* view process */}
        <View style={styles.viewMainProcess}>
          <ItemProcess
            title={I18n.t('orderNeedDelivery')}
            number={stateOrders.listInTransaction.length}
          />
          <ItemProcess title={I18n.t('debt')} number={onCalculatorDebt()} />
        </View>
      </View>
      {/* view chart */}
      <View style={styles.viewChart}>
        {/* view box1 */}
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.titleBox}>{I18n.t('overview')}</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.viewTimeBox}>
              <Text style={styles.timeBox}>
                {formatDay(mainStartDay)}
                {' - '}
                {formatDay(mainEndDay)}
              </Text>
              <IconCalendar
                width={responsiveWidth(14)}
                height={responsiveWidth(14)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <ItemRowDashboard
              type={0}
              title={I18n.t('revenue')}
              number={ordersByTime.revenue}>
              <IconApprove
                width={responsiveWidth(17)}
                height={responsiveWidth(17)}
              />
            </ItemRowDashboard>
            <ItemRowDashboard
              type={0}
              title={I18n.t('cost')}
              number={ordersByTime.cost}>
              <IconBill
                width={responsiveWidth(17)}
                height={responsiveWidth(17)}
              />
            </ItemRowDashboard>
            <ItemRowDashboard
              type={0}
              title={I18n.t('debt')}
              number={ordersByTime.debt}>
              <IconWorkOutDated
                width={responsiveWidth(17)}
                height={responsiveWidth(17)}
              />
            </ItemRowDashboard>
          </View>
          <View style={styles.viewTotal}>
            <Text style={styles.txtTotal}>{I18n.t('summarize')}: </Text>
            <Text
              style={[
                styles.txtNumberTotal,
                {
                  color:
                    onTotalMoney() >= 0 ? Colors.lightGreen : Colors.tomato,
                },
              ]}>
              {onTotalMoney() >= 0 ? '+' : ''}
              {number2money(onTotalMoney())} ₫
            </Text>
          </View>
        </View>
        {/* view box2 */}
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.titleBox}>{I18n.t('orderStatus')}</Text>
          </View>
          <View
            style={[styles.contentBox, {marginBottom: responsiveHeight(15)}]}>
            <ItemRowDashboard
              onPress={() =>
                navigation.navigate('Stack', {
                  screen: 'StatusOrders',
                  params: {status: 'inTransaction'},
                })
              }
              title={I18n.t('awaitPayment')}
              number={stateOrders.listInTransaction.length}>
              <IconTransaction
                width={responsiveWidth(17)}
                height={responsiveWidth(17)}
              />
            </ItemRowDashboard>
            <ItemRowDashboard
              onPress={() =>
                navigation.navigate('Stack', {
                  screen: 'StatusOrders',
                  params: {status: 'complete'},
                })
              }
              title={I18n.t('complete')}
              number={stateOrders.listComplete.length}>
              <IconComplete
                width={responsiveWidth(17)}
                height={responsiveWidth(17)}
              />
            </ItemRowDashboard>
            <ItemRowDashboard
              onPress={() =>
                navigation.navigate('Stack', {
                  screen: 'StatusOrders',
                  params: {status: 'cancellation'},
                })
              }
              title={I18n.t('beCancelled')}
              number={stateOrders.listCancel.length}>
              <IconCancelOrders
                width={responsiveWidth(17)}
                height={responsiveWidth(17)}
              />
            </ItemRowDashboard>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
