import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Platform,
  UIManager,
} from 'react-native';
import styles from '@modules/orders/styles/selectCustomer.styles';
import Header from '@components/Header';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import IconSync from '@assets/iconSvg/IconSync';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import SearchBase from '@components/SearchBase';
import {useSelector, useDispatch} from 'react-redux';
import {reduxGetCustomer} from '@actions/customerAction';

// Check platform android set flag animation layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function SelectCustomer({navigation}) {
  const {listCustomer} = useSelector(states => ({
    listCustomer: states.customer.listCustomer,
  }));
  const {user} = useSelector(states => ({user: states.auth.user}));
  const [isKeyboardShow, setIsKeyboardShow] = React.useState(false);
  const [listCustomerFilter, setListCustomerFilter] = React.useState(
    listCustomer,
  );
  const [textInputSearch, setTextInputSearch] = React.useState('');
  const dispatch = useDispatch();

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

  const ItemCustomer = React.memo(({item}) => (
    <View style={styles.viewItem}>
      <View style={styles.viewHeaderItem}>
        <Text style={styles.txtName}>{item.name}</Text>
        <View style={{width: responsiveWidth(20)}} />
      </View>
      <Text style={styles.txtPhone}>{item.phone}</Text>
      <Text numberOfLines={1} style={styles.txtAddress}>
        {item.address}
      </Text>
    </View>
  ));

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MyTabs', {
          screen: 'Add',
          params: {customerSelected: item},
        })
      }>
      <ItemCustomer item={item} />
    </TouchableOpacity>
  );

  const onFilterSearch = async text => {
    setTextInputSearch(text);
    const newData = await listCustomer.filter(customer => {
      const nameCustomer = customer.name.toUpperCase();
      const textData = text.toUpperCase();
      return nameCustomer.indexOf(textData) > -1;
    });
    setListCustomerFilter(newData);
  };

  const onGetListCustomer = async () => {
    await dispatch(
      reduxGetCustomer({
        userId: user.uid,
      }),
    );
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
          <Text style={styles.txtTitleHeader}>{I18n.t('selectCustomer')}</Text>
          <TouchableOpacity>
            <View style={{width: responsiveWidth(20)}} />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view search */}
      <View style={styles.viewSearch}>
        <SearchBase
          placeholder={I18n.t('search')}
          onChangeText={text => onFilterSearch(text)}
          value={textInputSearch}
          text={textInputSearch}
          onClear={() => onFilterSearch('')}
        />
      </View>
      {/* view sync */}
      <View style={styles.viewSync}>
        <View style={styles.viewNumberCustomer}>
          <Text style={styles.txtNumberCustomer}>
            {listCustomerFilter.length} {I18n.t('customer')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.viewIconSync}
          onPress={onGetListCustomer}>
          <IconSync
            width={responsiveWidth(22)}
            height={responsiveHeight(22)}
            fill={Colors.gray}
          />
        </TouchableOpacity>
      </View>
      {/* view list customer */}
      <KeyboardAvoidingView
        style={styles.viewFlatList}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={listCustomerFilter}
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
