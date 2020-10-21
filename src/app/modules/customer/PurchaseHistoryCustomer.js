import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from '@modules/customer/styles/purchaseHistoryCustomer.styles';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Header from '@components/Header';
import I18n from '@assets/localization/I18n';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import SearchBase from '@components/SearchBase';
import Colors from '@const/Colors';
import {getListPurchaseOrders} from '@services/firebase/order';
import number2money from '@utils/NumberToMoney';
import {useSelector} from 'react-redux';
import ModalLoading from '@components/ModalLoading';
import moment from 'moment';
import 'moment/locale/vi';
// set locale vn
moment.locale('vi');

const PurchaseHistoryCustomer = ({route, navigation}) => {
  const {documentId} = route.params;
  const [listOrder, setListOrder] = React.useState([]);
  const [isModalVisibleLoading, setModalVisibleLoading] = React.useState(false);
  const [listFilter, setListFilter] = React.useState([]);
  const [textSearch, setTextSearch] = React.useState('');
  const {user} = useSelector(states => ({user: states.auth.user}));
  React.useEffect(() => {
    async function getListData() {
      setModalVisibleLoading(true);
      let data = await getListPurchaseOrders(user.uid, documentId);
      if (data.length > 0) {
        data.sort((a, b) => {
          return b.createAt - a.createAt;
        });
        setListOrder(data);
        setListFilter(data);
      }
      setModalVisibleLoading(false);
    }
    getListData();
  }, [documentId, user.uid]);

  const ItemOrder = React.memo(({item}) => {
    let date = moment(item.createAt)
      .utcOffset(7)
      .format('DD/MM/YYYY HH:mm:ss');
    return (
      <View style={styles.viewItem}>
        <View style={styles.viewHeaderItem}>
          <Text style={styles.txtNameOrder}>{item.orderCode}</Text>
          <Text
            style={[
              styles.txtStatusOrder,
              {
                color:
                  item.statusOrder === 'cancellation'
                    ? Colors.orange
                    : Colors.lightGreen,
              },
            ]}>
            {I18n.t(item.statusOrder)}
          </Text>
        </View>
        <View style={styles.viewNameCustomerAndPrice}>
          <Text style={styles.txtDesc}>{item.customer.name}</Text>
          <Text style={styles.txtDesc}>{number2money(item.totalOrder)}</Text>
        </View>
        <Text style={styles.txtDesc}>{date}</Text>
      </View>
    );
  });

  const RenderItem = ({item}) => <ItemOrder item={item} />;

  const onFilterSearch = async text => {
    setTextSearch(text);
    const newData = await listOrder.filter(order => {
      const orderCode = order.orderCode.toUpperCase();
      const textData = text.toUpperCase();
      return orderCode.indexOf(textData) > -1;
    });
    setListFilter(newData);
  };

  return (
    <View style={styles.container}>
      {/* view loading when add product */}
      <ModalLoading
        isModalVisibleLoading={isModalVisibleLoading}
        title={I18n.t('loading')}
      />
      {/* view header */}
      <Header>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('purchaseHistory')}</Text>
          <View style={{width: responsiveWidth(20)}} />
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
      {/* view list */}
      <KeyboardAvoidingView
        style={styles.viewListItem}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FlatList
          data={listFilter}
          renderItem={RenderItem}
          keyExtractor={item => item.orderCode.toString()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default PurchaseHistoryCustomer;
