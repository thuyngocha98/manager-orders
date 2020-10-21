import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Platform,
  TextInput,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import styles from '@modules/customer/styles/customer.styles';
import Header from '@components/Header';
import IconPlus from '@assets/iconSvg/IconPlus';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import IconSearch from '@assets/iconSvg/IconSearch';
import I18n from '@assets/localization/I18n';
import IconSync from '@assets/iconSvg/IconSync';
import ItemCustomer from '@modules/customer/components/ItemCustomer';
import IconClear from '@assets/iconSvg/IconClear';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import {useSelector, useDispatch} from 'react-redux';
import {reduxGetCustomer} from '@actions/customerAction';
// Check platform android set flag animation layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function Customer({navigation}) {
  const {listCustomer} = useSelector(states => ({
    listCustomer: states.customer.listCustomer,
  }));
  const {user} = useSelector(states => ({user: states.auth.user}));
  const [enableSearch, setEnableSearch] = React.useState(false);
  const [isKeyboardShow, setIsKeyboardShow] = React.useState(false);
  const [textInputSearch, setTextInputSearch] = React.useState('');
  const [listCustomerFilter, setListCustomerFilter] = React.useState(
    listCustomer,
  );
  const inputSearchRef = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setListCustomerFilter(listCustomer);
  }, [listCustomer]);
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
          screen: 'DetailCustomer',
          params: {documentId: item.id},
        })
      }>
      <ItemCustomer item={item} />
    </TouchableOpacity>
  );

  const toggleButtonRight = () => {
    if (textInputSearch.length > 0) {
      onFilterSearch('');
    } else {
      Platform.OS === 'android' &&
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            100,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity,
          ),
        );
      if (!enableSearch) {
        setEnableSearch(true);
        inputSearchRef.current.focus();
      } else {
        setEnableSearch(false);
      }
    }
  };

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
        <View style={styles.contentHeader}>
          <Text style={styles.txtTitleHeader}>
            {!enableSearch && I18n.t('customer')}
          </Text>
          <View style={styles.viewIconRight}>
            {!enableSearch && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Stack', {
                    screen: 'AddCustomer',
                  })
                }
                style={styles.viewIcon}>
                <IconPlus
                  width={responsiveHeight(20)}
                  height={responsiveHeight(20)}
                />
              </TouchableOpacity>
            )}
            <View
              style={
                enableSearch
                  ? styles.viewEnableSearch
                  : styles.viewDisableSearch
              }>
              <TextInput
                ref={inputSearchRef}
                onChangeText={text => onFilterSearch(text)}
                value={textInputSearch}
                placeholder={enableSearch ? I18n.t('search') : ''}
                style={[
                  styles.input,
                  enableSearch ? styles.enableSearch : styles.disableSearch,
                ]}
              />
              <TouchableOpacity onPress={toggleButtonRight}>
                {enableSearch ? (
                  textInputSearch.length === 0 ? (
                    <IconArrowRight
                      width={responsiveHeight(20)}
                      height={responsiveHeight(20)}
                      fill={Colors.gray}
                    />
                  ) : (
                    <IconClear
                      width={responsiveHeight(20)}
                      height={responsiveHeight(15)}
                      fill={Colors.gray}
                    />
                  )
                ) : (
                  <IconSearch
                    width={responsiveHeight(20)}
                    height={responsiveHeight(20)}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Header>
      {/* view sync */}
      <View style={styles.viewSync}>
        <View onPress={() => {}} style={styles.viewNumberCustomer}>
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
