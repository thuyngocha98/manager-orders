import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import styles from '@modules/orders/styles/detailOrder.styles';
import Header from '@components/Header';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Icon3dotMore from '@assets/iconSvg/Icon3dotMore';
import InfoCustomer from '@modules/orders/components/InfoCustomer';
import I18n from '@assets/localization/I18n';
import NoteModal from '@components/NoteModal';
import Note from '@components/ViewNote';
import ItemProduct from '@modules/orders/components/ItemProduct';
import number2money from '@utils/NumberToMoney';
import BottomModalBase from '@components/BottomModalBase';
import IconRecycleBin from '@assets/iconSvg/IconRecycleBin';
import Colors from '@const/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {reduxEditOrder} from '@actions/orderAction';
import {getStatusOrderInTransaction} from '@services/firebase/order';
import {reduxEditCustomer} from '@actions/customerAction';
import {getImageProduct} from '@services/firebase/product';
// Check platform android set flag animation layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function DetailOrder({route, navigation}) {
  const {data} = route.params; // params from Orders screen
  const [
    isModalVisibleCancelOrder,
    setModalVisibleCancelOrder,
  ] = React.useState(false);
  const [isModalVisibleVerify, setModalVisibleVerify] = React.useState(false);
  const [
    isModalVisibleVerifyCheckout,
    setModalVisibleVerifyCheckout,
  ] = React.useState(false);
  const [listProduct, setListProduct] = React.useState(data.listProduct);
  const [isSelectDelete, setSelectCancel] = React.useState(false);
  const [keyboardSpace, setKeyboardSpace] = React.useState(0); // state listener keyboard show hide
  const [contentNote, setContentNote] = React.useState(data.note); // state contentNote
  const [isModalVisible, setModalVisible] = React.useState(false); // state modal visible
  const [valueNote, setValueNote] = React.useState(data.note); // state value text note on modal
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  React.useEffect(() => {
    const getImageForListProduct = async () => {
      let newData = [...data.listProduct];
      for (var el of newData) {
        let image = await getImageProduct(user.uid, el.id);
        el.image = image;
      }
      setListProduct(newData);
    };
    getImageForListProduct();
  }, [data, user.uid]);
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

  // function confirm change/add note
  const onPressRejectNote = () => {
    setValueNote(contentNote);
    toggleModal();
  };

  // function confirm change/add note
  const onPressConfirmNote = async () => {
    await dispatch(
      reduxEditOrder({
        userId: user.uid,
        documentId: data.id,
        objectDataEdit: {
          note: valueNote,
        },
      }),
    );
    setContentNote(valueNote);
    toggleModal();
  };

  // show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalCancelOrder = () => {
    setModalVisibleCancelOrder(!isModalVisibleCancelOrder);
  };

  const toggleModalVerify = () => {
    setModalVisibleVerify(!isModalVisibleVerify);
  };

  const toggleModalVerifyCheckout = () => {
    setModalVisibleVerifyCheckout(!isModalVisibleVerifyCheckout);
  };

  const onSelectCancel = () => {
    setSelectCancel(true);
    toggleModalCancelOrder();
  };

  const onPressCancelOrder = () => {
    toggleModalVerify();
    setSelectCancel(false);
  };

  const onCancelOrder = async () => {
    toggleModalVerify();
    await dispatch(
      reduxEditOrder({
        userId: user.uid,
        documentId: data.id,
        objectDataEdit: {
          statusOrder: 'cancellation',
        },
      }),
    );
    let listStatusCustomer = await getStatusOrderInTransaction(
      user.uid,
      data.customer.id,
    );
    let statusCustomer =
      listStatusCustomer.length > 0 ? 'inTransaction' : 'complete';
    await dispatch(
      reduxEditCustomer({
        userId: user.uid,
        documentId: data.customer.id,
        objectDataEdit: {
          orderStatus: statusCustomer,
        },
      }),
    );
    navigation.goBack();
  };

  const onCheckoutOrder = async () => {
    toggleModalVerifyCheckout();
    await dispatch(
      reduxEditOrder({
        userId: user.uid,
        documentId: data.id,
        objectDataEdit: {
          statusOrder: 'complete',
        },
      }),
    );
    let listStatusCustomer = await getStatusOrderInTransaction(
      user.uid,
      data.customer.id,
    );
    let statusCustomer =
      listStatusCustomer.length > 0 ? 'inTransaction' : 'complete';
    await dispatch(
      reduxEditCustomer({
        userId: user.uid,
        documentId: data.customer.id,
        objectDataEdit: {
          orderStatus: statusCustomer,
        },
      }),
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* view modal note */}
      <NoteModal keyboardSpace={keyboardSpace} isModalVisible={isModalVisible}>
        <View style={styles.viewModal}>
          <Text style={styles.txtTitleModal}>{I18n.t('note')}</Text>
          <View style={styles.viewInput}>
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
      {/* view modal delete */}
      <BottomModalBase
        onModalHide={() => {
          if (isSelectDelete) {
            toggleModalVerify();
          }
        }}
        toggleModal={toggleModalCancelOrder}
        isModalVisible={isModalVisibleCancelOrder}>
        <View style={styles.viewModalDelete}>
          <TouchableOpacity
            onPress={onSelectCancel}
            style={styles.viewItemDelete}>
            <IconRecycleBin
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.gray}
            />
            <Text style={styles.txtDeleteCustomer}>
              {I18n.t('cancelOrder')}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModalBase>
      {/* view modal verify delete */}
      <BottomModalBase isModalVisible={isModalVisibleVerify}>
        <View style={styles.viewModalBottom}>
          <Text style={styles.txtTitleModalDelete}>
            {I18n.t('cancelOrder')}
          </Text>
          <Text style={styles.txtVerifyDelete}>
            {I18n.t('areYouSureYouWantToCancelThisOrder')}
          </Text>
          <View style={styles.viewBtn}>
            <TouchableOpacity onPress={onPressCancelOrder} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('exit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancelOrder} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModalBase>
      {/* view modal verify check out */}
      <BottomModalBase isModalVisible={isModalVisibleVerifyCheckout}>
        <View style={styles.viewModalBottom}>
          <Text style={styles.txtTitleModalDelete}>{I18n.t('payment')}</Text>
          <Text style={styles.txtVerifyDelete}>
            {I18n.t('areYouWantToPayThisOrder')}
          </Text>
          <View style={styles.viewBtn}>
            <TouchableOpacity
              onPress={toggleModalVerifyCheckout}
              style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('exit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCheckoutOrder} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('payment')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModalBase>
      {/* view header */}
      <Header>
        <View style={styles.contentHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{data.orderCode}</Text>
          <View style={{width: responsiveWidth(20)}} />
        </View>
      </Header>
      <ScrollView>
        {/* view total order */}
        <View style={styles.viewTotalOrder}>
          <Text style={styles.txtNameOrder}>{I18n.t('totalOrders')}</Text>
          <Text style={styles.txtTotalOrder}>
            {number2money(data.totalOrder)}
          </Text>
        </View>
        {/* view line */}
        <View style={styles.line} />
        {/* view info customer */}
        <View style={styles.viewInfoCustomer}>
          <Text style={styles.txtTitleInfoCustomer}>{I18n.t('customer')}</Text>
          <InfoCustomer
            name={data.customer.name}
            phone={data.customer.phone}
            address={data.customer.address}
          />
        </View>
        {/* view line */}
        <View style={styles.line} />
        {/* view product */}
        <View style={styles.viewProduct}>
          <Text style={styles.txtTitleProduct}>
            {I18n.t('product')} (
            {listProduct.reduce((acc, cur) => acc + cur.amount, 0)})
          </Text>
          {listProduct.map(item => (
            <ItemProduct key={item.id} item={item} />
          ))}
        </View>
        {/* view line */}
        <View style={styles.line} />
        {/* view detail price */}
        <View style={styles.viewDetailPrice}>
          <View style={styles.rowDetailPrice}>
            <Text style={styles.titlePrice}>{I18n.t('totalMoneyOrders')}</Text>
            <Text style={styles.txtPrice}>{number2money(data.totalOrder)}</Text>
          </View>
          <View style={styles.rowDetailPrice}>
            <Text style={styles.titlePrice}>{I18n.t('deliveryCharges')}</Text>
            <Text style={styles.txtPrice}>0</Text>
          </View>
          <View style={styles.rowDetailPrice}>
            <Text style={styles.titlePrice}>{I18n.t('moneyCustomerPay')}</Text>
            <Text style={styles.txtPrice}>{number2money(data.totalOrder)}</Text>
          </View>
        </View>
        {/* view line */}
        <View style={styles.line} />
        {/* view note */}
        <Note contentNote={contentNote} toggleModal={toggleModal} />
        {/* view line */}
      </ScrollView>
      {/* view button payment */}
      {(!keyboardSpace || Platform.OS === 'ios') &&
        (data.statusOrder === 'inTransaction' ? (
          <View style={styles.viewButtonPayment}>
            <TouchableOpacity
              onPress={toggleModalVerifyCheckout}
              style={styles.viewBtnPay}>
              <Text style={styles.txtPayment}>{I18n.t('payment')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModalCancelOrder}
              style={styles.btnMore}>
              <Icon3dotMore
                width={responsiveHeight(20)}
                height={responsiveHeight(20)}
              />
            </TouchableOpacity>
          </View>
        ) : null)}
    </View>
  );
}
