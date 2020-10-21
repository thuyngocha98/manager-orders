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
import styles from '@modules/home/styles/statusOrders.styles';
import Header from '@components/Header';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import ItemOrders from '@modules/orders/components/ItemOrders';
import I18n from '@assets/localization/I18n';
import SearchBase from '@components/SearchBase';
import {useSelector} from 'react-redux';

export default function StatusOrders({route, navigation}) {
  const {status} = route.params;
  const {listOrders} = useSelector(states => ({
    listOrders: states.order.listOrders,
  }));
  const listStatusOrders = listOrders.filter(el => el.statusOrder === status);
  const [isKeyboardShow, setIsKeyboardShow] = React.useState(false);
  const [listOrdersFilter, setListOrdersFilter] = React.useState(
    listStatusOrders,
  );
  React.useEffect(() => {
    setListOrdersFilter(listOrders.filter(el => el.statusOrder === status));
  }, [listOrders, status]);
  const [textSearch, setTextSearch] = React.useState('');
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

  const onFilterSearch = async text => {
    setTextSearch(text);
    const newData = await listStatusOrders.filter(order => {
      const orderCode = order.orderCode.toUpperCase();
      const textData = text.toUpperCase();
      return orderCode.indexOf(textData) > -1;
    });
    setListOrdersFilter(newData);
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
          <Text style={styles.txtTitleHeader}>{I18n.t('orders')}</Text>
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
      {/* view filter */}
      <View style={styles.viewFilter}>
        <View style={styles.titleFilter}>
          <Text style={styles.txtTitleFilter}>{I18n.t('total')}</Text>
          <View style={styles.underLineTitleFilter} />
        </View>
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
          keyExtractor={item => item?.id.toString()}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
