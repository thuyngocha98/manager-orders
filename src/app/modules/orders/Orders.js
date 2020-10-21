import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '@modules/orders/styles/orders.styles';
import HeaderNoGoBack from '@components/HeaderNoGoBack';
import IconFilter from '@assets/iconSvg/IconFilter';
import IconCancelOrders from '@assets/iconSvg/IconCancelOrders';
import IconComplete from '@assets/iconSvg/IconComplete';
import IconTransaction from '@assets/iconSvg/IconTransaction';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import ItemOrders from '@modules/orders/components/ItemOrders';
import I18n from '@assets/localization/I18n';
import BottomModalBase from '@components/BottomModalBase';
import SearchBase from '@components/SearchBase';
import CheckBoxBase from '@components/CheckBoxBase';
import {useSelector} from 'react-redux';

export default function Orders({navigation}) {
  const {listOrders} = useSelector(states => ({
    listOrders: states.order.listOrders,
  }));
  const [stateStatusOrder, setStateStatusOrder] = React.useState({
    allOrders: true,
    inTransaction: false,
    complete: false,
    cancellation: false,
  });
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isKeyboardShow, setIsKeyboardShow] = React.useState(false);
  const [listOrdersFilter, setListOrdersFilter] = React.useState(listOrders);
  const [textSearch, setTextSearch] = React.useState('');
  React.useEffect(() => {
    setListOrdersFilter(listOrders);
  }, [listOrders]);
  // function listener keyboard show hide
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      frames => {
        if (!frames.endCoordinates) {
          return;
        }
        setIsKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      frames => {
        setIsKeyboardShow(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // function set show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Stack', {
          screen: 'DetailOrder',
          params: {data: item},
        })
      }>
      <ItemOrders data={item} />
    </TouchableOpacity>
  );

  const functionFilterProduct = async status => {
    const newData = await listOrders.filter(order => {
      return order.statusOrder === status;
    });
    setListOrdersFilter(newData);
  };

  const filterListOrders = async name => {
    if (name === 'allOrders') {
      setListOrdersFilter(listOrders);
      setStateStatusOrder({
        allOrders: true,
        inTransaction: false,
        complete: false,
        cancellation: false,
      });
      toggleModal();
    } else if (name === 'inTransaction') {
      await functionFilterProduct(name);
      setStateStatusOrder({
        allOrders: false,
        inTransaction: true,
        complete: false,
        cancellation: false,
      });
      toggleModal();
    } else if (name === 'complete') {
      await functionFilterProduct(name);
      setStateStatusOrder({
        allOrders: false,
        inTransaction: false,
        complete: true,
        cancellation: false,
      });
      toggleModal();
    } else if (name === 'cancellation') {
      await functionFilterProduct(name);
      setStateStatusOrder({
        allOrders: false,
        inTransaction: false,
        complete: false,
        cancellation: true,
      });
      toggleModal();
    }
  };

  const onFilterSearch = async text => {
    setTextSearch(text);
    const newData = await listOrders.filter(order => {
      const orderCode = order.orderCode.toUpperCase();
      const textData = text.toUpperCase();
      return orderCode.indexOf(textData) > -1;
    });
    setListOrdersFilter(newData);
  };

  return (
    <View style={styles.container}>
      {/* view modal filter order by status */}
      <BottomModalBase
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}>
        <View style={styles.viewModal}>
          <Text style={styles.txtTitleModal} onPress={toggleModal}>
            {I18n.t('filterOrdersByStatus')}
          </Text>
          <View style={styles.chooseAll}>
            <Text style={styles.txtModal}>{I18n.t('total')}</Text>
            <View style={styles.viewCheckBox}>
              <CheckBoxBase
                onPress={() => filterListOrders('allOrders')}
                isChecked={stateStatusOrder.allOrders}
              />
            </View>
          </View>
          <View style={styles.chooseAll}>
            <View style={styles.viewIconAndText}>
              <IconTransaction width={20} height={20} fill={Colors.orange} />
              <Text style={styles.txtModal}>{I18n.t('inTransaction')}</Text>
            </View>
            <View style={styles.viewCheckBox}>
              <CheckBoxBase
                onPress={() => filterListOrders('inTransaction')}
                isChecked={stateStatusOrder.inTransaction}
              />
            </View>
          </View>
          <View style={styles.chooseAll}>
            <View style={styles.viewIconAndText}>
              <IconComplete width={20} height={20} fill={Colors.lightGreen} />
              <Text style={styles.txtModal}>{I18n.t('complete')}</Text>
            </View>
            <View style={styles.viewCheckBox}>
              <CheckBoxBase
                onPress={() => filterListOrders('complete')}
                isChecked={stateStatusOrder.complete}
              />
            </View>
          </View>
          <View style={styles.chooseAll}>
            <View style={styles.viewIconAndText}>
              <IconCancelOrders width={20} height={20} fill={Colors.gray} />
              <Text style={styles.txtModal}>{I18n.t('cancellation')}</Text>
            </View>
            <View style={styles.viewCheckBox}>
              <CheckBoxBase
                onPress={() => filterListOrders('cancellation')}
                isChecked={stateStatusOrder.cancellation}
              />
            </View>
          </View>
        </View>
      </BottomModalBase>
      {/* view header */}
      <HeaderNoGoBack title={I18n.t('orders')} />
      {/* view search */}
      <SearchBase
        placeholder={I18n.t('search')}
        onChangeText={text => onFilterSearch(text)}
        value={textSearch}
        text={textSearch}
        onClear={() => onFilterSearch('')}
      />
      {/* view filter */}
      <View style={styles.viewFilter}>
        <View style={styles.titleFilter}>
          <Text style={styles.txtTitleFilter}>{I18n.t('total')}</Text>
          <View style={styles.underLineTitleFilter} />
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.viewIconFilter}>
          <IconFilter
            fill={Colors.gray}
            width={responsiveWidth(20)}
            height={responsiveHeight(20)}
          />
        </TouchableOpacity>
      </View>
      {/* view number item */}
      <View style={styles.viewNumberItem}>
        <View style={styles.viewAbsolute1} />
        <Text style={styles.txtNumberItem}>
          {listOrdersFilter.length} {I18n.t('orders')}
        </Text>
      </View>
      {/* view list item */}
      <KeyboardAvoidingView
        style={styles.viewFlatList}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FlatList
          data={listOrdersFilter}
          style={
            Platform.OS === 'ios' && isKeyboardShow
              ? styles.enableMarginBottom
              : 0
          }
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
