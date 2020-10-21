import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  Keyboard,
  UIManager,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from '@modules/orders/styles/addOrders.styles';
import HeaderNoGoBack from '@components/HeaderNoGoBack';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import I18n from '@assets/localization/I18n';
import IconProduct from '@assets/iconSvg/IconProduct';
import IconSync from '@assets/iconSvg/IconSync';
import IconClear from '@assets/iconSvg/IconClear';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconUser from '@assets/iconSvg/IconUser';
import SwitchBase from '@components/SwitchBase';
import NoteModal from '@components/NoteModal';
import ViewNote from '@components/ViewNote';
import BottomModalBase from '@components/BottomModalBase';
import number2money from '@utils/NumberToMoney';
import uuidv4 from '@utils/Uuidv4Utils';
import {useSelector, useDispatch} from 'react-redux';
import {reduxAddOrder} from '@actions/orderAction';
import GenerateCodeOrders from '@utils/GenerateCodeOrders';
import {getStatusOrderInTransaction} from '@services/firebase/order';
import {reduxEditCustomer} from '@actions/customerAction';
import ModalLoading from '@components/ModalLoading';
import SelectPathImage from '@utils/SelectPathImage';
import moment from 'moment';
import 'moment/locale/vi';
// set locale vn
moment.locale('vi');
// Check platform android set flag animation layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const AddOrders = ({route, navigation}) => {
  const [listProduct, setListProduct] = React.useState([]);
  const [customer, setCustomer] = React.useState(null);
  const [isPaid, setPaid] = React.useState(false);
  const [isModalPriceVisible, setModalPriceVisible] = React.useState(false);
  const [keyboardSpace, setKeyboardSpace] = React.useState(0); // state listener keyboard show hide
  const [contentNote, setContentNote] = React.useState(''); // state contentNote
  const [isModalVisible, setModalVisible] = React.useState(false); // state modal visible
  const [valueNote, setValueNote] = React.useState(''); // state value text note on modal
  const [isRetailPrice, setRetailPrice] = React.useState(true);
  const [isModalVisibleLoading, setModalVisibleLoading] = React.useState(false);
  const [isValidCustomer, setValidCustomer] = React.useState(true);
  const [isValidProduct, setValidProduct] = React.useState(true);
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  // listener param customer select
  React.useEffect(() => {
    const customerSelected = route.params?.customerSelected
      ? route.params.customerSelected
      : null;
    if (customerSelected) {
      setCustomer(customerSelected);
    }
  }, [route.params]);
  // listener param product select
  React.useEffect(() => {
    const productSelected = route.params?.productSelected
      ? route.params.productSelected
      : null;
    if (productSelected?.length > 0) {
      if (!productSelected[0].numberSelected) {
        setListProduct(
          productSelected.map(item => ({...item, numberSelected: 1})),
        );
        navigation.setParams({
          productSelected: productSelected.map(item => ({
            ...item,
            numberSelected: 1,
          })),
        });
      }
    }
  }, [navigation, route.params]);
  // listener keyboard
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      frames => {
        if (!frames.endCoordinates) {
          return;
        }
        Platform.OS === 'android' &&
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardSpace(frames.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      frames => {
        Platform.OS === 'android' &&
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardSpace(0);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // function set show hide modal price
  const toggleModalPrice = () => {
    setModalPriceVisible(!isModalPriceVisible);
  };

  // function confirm change/add note
  const onPressRejectNote = () => {
    setValueNote(contentNote);
    toggleModalNote();
  };

  // function confirm change/add note
  const onPressConfirmNote = () => {
    setContentNote(valueNote);
    toggleModalNote();
  };

  // show hide modal note
  const toggleModalNote = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSwitch = () => {
    setPaid(!isPaid);
  };

  const onRemoveSelectProduct = index => {
    let listData = [...listProduct];
    listData.splice(index, 1);
    navigation.setParams({productSelected: listData});
    setListProduct([...listData]);
  };

  const SelectProduct = () => {
    navigation.navigate('Stack', {
      screen: 'SelectProduct',
    });
  };

  const onRemoveSelectCustomer = () => {
    navigation.setParams({customerSelected: null});
    setCustomer(null);
  };

  const toggleTypePrice = isSelect => {
    if (!isSelect) {
      setRetailPrice(!isRetailPrice);
    }
    toggleModalPrice();
  };

  const calculatorCostOrder = () => {
    let cost = listProduct.reduce(
      (acc, cur) => acc + cur.importPrice * cur.numberSelected,
      0,
    );
    return cost;
  };

  const calculatorTotalMoneyOrder = () => {
    if (isRetailPrice) {
      let price = listProduct.reduce(
        (acc, cur) => acc + cur.retailPrice * cur.numberSelected,
        0,
      );
      return number2money(price);
    } else {
      let price = listProduct.reduce(
        (acc, cur) => acc + cur.businessPrice * cur.numberSelected,
        0,
      );
      return number2money(price);
    }
  };

  const selectCustomer = () => {
    navigation.navigate('Stack', {
      screen: 'SelectCustomer',
    });
  };

  const RenderItemRow = ({title, isRetail}) => (
    <TouchableOpacity
      onPress={() => toggleTypePrice(isRetail)}
      style={styles.viewItemRow}>
      <Text style={isRetail ? styles.txtItemRowSelect : styles.txtItemRow}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const RenderItemSelect = ({children, onPress, title, desc}) => (
    <TouchableOpacity onPress={onPress} style={styles.viewNoItem}>
      {children}
      <View style={styles.viewTextItem}>
        <Text style={styles.txtTitleAddItem}>{title}</Text>
        <Text style={styles.txtDescAddItem}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );

  const onPlusMinusNumberSelected = (index, type) => {
    let listData = listProduct;
    if (type === 1) {
      listData[index].numberSelected += 1;
    } else {
      listData[index].numberSelected -= 1;
    }
    setListProduct([...listData]);
  };

  const onCreateOrder = async () => {
    if (customer && listProduct.length > 0) {
      setModalVisibleLoading(true);
      const time = moment()
        .utcOffset(7)
        .format('x');
      let documentId = uuidv4();
      let statusOrder = isPaid ? 'complete' : 'inTransaction';
      let orderCode = GenerateCodeOrders();
      let totalOrder = calculatorTotalMoneyOrder();
      totalOrder = totalOrder.replace(/,/g, '');
      let costOrder = calculatorCostOrder();
      let listDataProduct = [];
      listProduct.map(product => {
        let obj = {
          id: product.id,
          price: isRetailPrice ? product.retailPrice : product.businessPrice,
          amount: product.numberSelected,
          productName: product.productName,
          productCode: product.productCode,
        };
        listDataProduct.push(obj);
      });
      await dispatch(
        reduxAddOrder({
          userId: user.uid,
          documentId: documentId,
          data: {
            orderCode: orderCode,
            listProduct: listDataProduct,
            customer: {
              id: customer.id,
              name: customer.name,
              phone: customer.phone,
              address: customer.address,
            },
            totalOrder: totalOrder,
            costOrder: costOrder,
            statusOrder: statusOrder,
            note: contentNote,
            createAt: parseInt(time, 10),
          },
        }),
      );
      let listStatusCustomer = await getStatusOrderInTransaction(
        user.uid,
        customer.id,
      );
      let statusCustomer =
        listStatusCustomer.length > 0 ? 'inTransaction' : 'complete';
      await dispatch(
        reduxEditCustomer({
          userId: user.uid,
          documentId: customer.id,
          objectDataEdit: {
            orderStatus: statusCustomer,
          },
        }),
      );
      await navigation.setParams({
        customerSelected: null,
        productSelected: null,
      });
      setContentNote('');
      setListProduct([]);
      setCustomer(null);
      setPaid(false);
      setRetailPrice(true);
      setValueNote('');
      setModalVisibleLoading(false);
      navigation.navigate('MyTabs', {screen: 'Orders'});
    } else {
      if (!customer) {
        setValidCustomer(false);
        setTimeout(() => {
          setValidCustomer(true);
        }, 3000);
      } else {
        setValidCustomer(true);
      }
      if (listProduct.length > 0) {
        setValidProduct(true);
      } else {
        setValidProduct(false);
        setTimeout(() => {
          setValidProduct(true);
        }, 3000);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* view modal loading */}
      <ModalLoading
        isModalVisibleLoading={isModalVisibleLoading}
        title={I18n.t('saving')}
      />
      {/* view modal price */}
      <BottomModalBase
        toggleModal={toggleModalPrice}
        isModalVisible={isModalPriceVisible}>
        <View style={styles.viewModal}>
          <Text style={styles.txtTitleModalPrice}>
            {I18n.t('selectTheSellPriceType')}
          </Text>
          <RenderItemRow
            title={I18n.t('retailPrice')}
            isRetail={isRetailPrice}
          />
          <RenderItemRow
            title={I18n.t('businessPrice')}
            isRetail={!isRetailPrice}
          />
        </View>
      </BottomModalBase>
      {/* view modal note*/}
      <NoteModal keyboardSpace={keyboardSpace} isModalVisible={isModalVisible}>
        <View style={styles.viewModalNote}>
          <Text style={styles.txtTitleModalNote}>{I18n.t('note')}</Text>
          <View style={styles.viewInputNote}>
            <TextInput
              defaultValue={contentNote}
              value={valueNote}
              onChangeText={text => setValueNote(text)}
              numberOfLines={5}
              multiline={true}
              style={styles.input}
            />
          </View>
          <View style={styles.lineModal} />
          <View style={styles.viewBtnModal}>
            <TouchableOpacity
              onPress={onPressRejectNote}
              style={styles.viewTxtBtnModal}>
              <Text style={styles.txtBtnModal}>{I18n.t('exit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressConfirmNote}
              style={styles.viewTxtBtnModal}>
              <Text style={styles.txtBtnModal}>{I18n.t('confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </NoteModal>
      {/* view header */}
      <HeaderNoGoBack title={I18n.t('addOrders')}>
        <View style={{width: responsiveWidth(20)}} />
      </HeaderNoGoBack>
      <ScrollView style={styles.viewContent}>
        <View style={styles.viewProduct}>
          {listProduct.length > 0 ? (
            <View style={styles.viewHaveProduct}>
              {listProduct.map((product, index) => (
                <View key={product.id} style={styles.viewHaveItemProduct}>
                  <TouchableOpacity
                    onPress={() => onRemoveSelectProduct(index)}
                    style={styles.viewDeleteProduct}>
                    <IconClear
                      width={responsiveHeight(13)}
                      height={responsiveHeight(13)}
                      fill={Colors.gray}
                    />
                  </TouchableOpacity>
                  <View style={styles.viewInfoProduct}>
                    <View style={styles.viewImageProduct}>
                      <View style={styles.viewLoading}>
                        <IconSync
                          width={responsiveHeight(20)}
                          height={responsiveHeight(20)}
                          fill={Colors.gray}
                        />
                      </View>
                      <Image
                        source={
                          product?.images[0]
                            ? {
                                uri: product?.images[0]
                                  ? SelectPathImage(product.images[0])
                                  : null,
                                cache: 'force-cache',
                              }
                            : null
                        }
                        style={styles.imageProduct}
                      />
                    </View>
                    <View style={styles.viewContentProduct}>
                      <Text numberOfLines={2} style={styles.txtNameProduct}>
                        {product.productName}
                      </Text>
                    </View>
                    <View style={styles.viewSelectNumberProduct}>
                      <TouchableOpacity
                        style={styles.viewBtnAdjust}
                        onPress={() =>
                          product.numberSelected > 1
                            ? onPlusMinusNumberSelected(index, 0)
                            : null
                        }>
                        <Text style={styles.btnAdjustNumberProduct}>-</Text>
                      </TouchableOpacity>
                      <View style={styles.viewNumberProduct}>
                        <Text style={styles.txtNumberProduct}>
                          {product.numberSelected.toString()}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.viewBtnAdjust}
                        onPress={() => onPlusMinusNumberSelected(index, 1)}>
                        <Text style={styles.btnAdjustNumberProduct}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                onPress={toggleModalPrice}
                style={styles.viewSelectPrice}>
                <Text style={styles.txtTypePrice}>
                  {isRetailPrice
                    ? I18n.t('retailPrice')
                    : I18n.t('businessPrice')}
                </Text>
                <View style={styles.viewPrice}>
                  <IconArrowRight
                    width={responsiveWidth(20)}
                    height={responsiveHeight(20)}
                    fill={Colors.gray}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.viewMainItemProduct}>
                <View style={styles.viewItemProduct}>
                  <Text style={styles.txtTypePrice}>{I18n.t('amount')}</Text>
                  <Text style={styles.txtTypePrice}>
                    {listProduct.reduce(
                      (acc, cur) => acc + cur.numberSelected,
                      0,
                    )}
                  </Text>
                </View>
                <View style={styles.viewItemProduct}>
                  <Text style={styles.txtTypePrice}>
                    {I18n.t('totalOrderAmount')}
                  </Text>
                  <Text style={styles.txtTypePrice}>
                    {calculatorTotalMoneyOrder()}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <RenderItemSelect
              onPress={SelectProduct}
              title={I18n.t('addProduct')}
              desc={I18n.t('yourOrderHasNoProduct')}>
              <IconProduct
                width={responsiveWidth(20)}
                height={responsiveHeight(20)}
                fill={Colors.gray}
              />
            </RenderItemSelect>
          )}
        </View>
        {!isValidProduct && (
          <Text style={styles.txtValid}>{I18n.t('pleaseAddProduct')}</Text>
        )}
        {/* view customer */}
        <View style={styles.viewCustomer}>
          {customer != null ? (
            <View style={styles.viewInfoCustomer}>
              <TouchableOpacity
                onPress={onRemoveSelectCustomer}
                style={styles.viewIconClear}>
                <IconClear
                  width={responsiveHeight(13)}
                  height={responsiveHeight(13)}
                  fill={Colors.gray}
                />
              </TouchableOpacity>
              <View style={styles.contentCustomer}>
                <Text style={styles.txtTitleCustomer}>
                  {I18n.t('customer')}
                </Text>
                <Text style={styles.txtInfoCustomer}>
                  {I18n.t('fullName')}: {customer.name}
                </Text>
                <Text style={styles.txtInfoCustomer}>
                  {I18n.t('phoneNumber')}: {customer.phone}
                </Text>
                <Text numberOfLines={1} style={styles.txtInfoCustomer}>
                  {I18n.t('address')}: {customer.address}
                </Text>
              </View>
            </View>
          ) : (
            <RenderItemSelect
              onPress={selectCustomer}
              title={I18n.t('addCustomer')}
              desc={I18n.t('yourOrderHasNoCustomer')}>
              <IconUser
                width={responsiveWidth(20)}
                height={responsiveHeight(20)}
                fill={Colors.gray}
              />
            </RenderItemSelect>
          )}
        </View>
        {!isValidCustomer && (
          <Text style={styles.txtValid}>{I18n.t('pleaseAddCustomer')}</Text>
        )}
        {/* view is paid */}
        <View style={styles.viewIsPaid}>
          <Text style={styles.txtTitlePaid}>
            {I18n.t('theOrderHasBeenPaidYet')}
          </Text>
          <SwitchBase toggleSwitch={toggleSwitch} isEnabledSwitch={isPaid} />
        </View>
        {/* view note */}
        <ViewNote contentNote={contentNote} toggleModal={toggleModalNote} />
      </ScrollView>
      {/* view button create order */}
      {(!keyboardSpace || Platform.OS === 'ios') && (
        <View style={styles.viewCreateOrder}>
          <TouchableOpacity
            onPress={onCreateOrder}
            style={styles.viewButtonCreateOrder}>
            <Text style={styles.txtCreateOrders}>{I18n.t('createOrder')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddOrders;
