import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import styles from '@modules/customer/styles/detailCustomer.styles';
import Header from '@components/Header';
import I18n from '@assets/localization/I18n';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Icon3dotMore from '@assets/iconSvg/Icon3dotMore';
import IconEdit from '@assets/iconSvg/IconEdit';
import IconRecycleBin from '@assets/iconSvg/IconRecycleBin';
import Colors from '@const/Colors';
import BottomModalBase from '@components/BottomModalBase';
import DetailInfoCustomer from '@modules/customer/DetailInfoCustomer';
import {TextInput} from 'react-native-gesture-handler';
import NoteModal from '@components/NoteModal';
import Note from '@components/ViewNote';
import {useSelector, useDispatch} from 'react-redux';
import {reduxDeleteCustomer, reduxEditCustomer} from '@actions/customerAction';
import firestore from '@react-native-firebase/firestore';

// Check platform android set flag animation layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const DetailCustomer = ({route, navigation}) => {
  const {documentId} = route.params; // params from customer screen
  const [isModalVisibleDelete, setModalVisibleDelete] = React.useState(false);
  const [isModalVisibleVerify, setModalVisibleVerify] = React.useState(false);
  const [isSelectDelete, setSelectDelete] = React.useState(false);
  const [stateInfo, setStateInfo] = React.useState({
    info: false,
    address: false,
    debt: false,
    purchaseHistory: false,
    note: false,
  });
  const [keyboardSpace, setKeyboardSpace] = React.useState(0); // state listener keyboard show hide
  const [contentNote, setContentNote] = React.useState(''); // state contentNote
  const [isModalVisible, setModalVisible] = React.useState(false); // state modal visible
  const [valueNote, setValueNote] = React.useState(''); // state value text note on modal
  const [infoCustomer, setInfoCustomer] = React.useState({});
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('customer')
      .doc(documentId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setInfoCustomer(documentSnapshot.data());
          setContentNote(documentSnapshot.data().note);
          setValueNote(documentSnapshot.data().note);
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

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
    Keyboard.dismiss();
    toggleModal();
    await dispatch(
      reduxEditCustomer({
        userId: user.uid,
        documentId: documentId,
        objectDataEdit: {
          note: valueNote,
        },
      }),
    );
  };

  // show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalDelete = () => {
    setModalVisibleDelete(!isModalVisibleDelete);
  };

  const toggleModalVerify = () => {
    setModalVisibleVerify(!isModalVisibleVerify);
  };

  const onSelectDelete = () => {
    setSelectDelete(true);
    toggleModalDelete();
  };

  const onCancelDelete = () => {
    toggleModalVerify();
    setSelectDelete(false);
  };

  const onSetStateInfo = field => {
    setStateInfo({
      ...stateInfo,
      [field]: !stateInfo[field],
    });
  };

  const RenderItemCollapse = ({title, onPress, isChecked}) => (
    <TouchableOpacity onPress={onPress} style={styles.viewItem}>
      <Text style={styles.txtTitle}>{title}</Text>
      <View style={isChecked ? styles.viewClickIconItem : null}>
        <IconArrowRight
          width={responsiveHeight(20)}
          height={responsiveHeight(20)}
        />
      </View>
    </TouchableOpacity>
  );

  const RenderItem = ({title, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.viewItem}>
      <Text style={styles.txtTitle}>{title}</Text>
      <IconArrowRight
        width={responsiveHeight(20)}
        height={responsiveHeight(20)}
      />
    </TouchableOpacity>
  );

  const onDeleteCustomer = async () => {
    toggleModalVerify();
    navigation.navigate('MyTabs', {screen: 'Customer'});
    await dispatch(
      reduxDeleteCustomer({
        userId: user.uid,
        customerId: documentId,
      }),
    );
  };

  return (
    <View style={styles.container}>
      {/* view modal */}
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
      {/* view modal delete */}
      <BottomModalBase
        onModalHide={() => {
          if (isSelectDelete) {
            toggleModalVerify();
          }
        }}
        toggleModal={toggleModalDelete}
        isModalVisible={isModalVisibleDelete}>
        <View style={styles.viewModal}>
          <TouchableOpacity
            onPress={onSelectDelete}
            style={styles.viewItemDelete}>
            <IconRecycleBin
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.gray}
            />
            <Text style={styles.txtDeleteCustomer}>
              {I18n.t('deleteCustomer')}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModalBase>
      {/* view modal verify delete */}
      <BottomModalBase isModalVisible={isModalVisibleVerify}>
        <View style={styles.viewModalBottom}>
          <Text style={styles.txtTitleModal}>{I18n.t('deleteCustomer')}</Text>
          <Text style={styles.txtVerifyDelete}>
            {I18n.t('areYouSureYouWantToDeleteThisCustomer')}
          </Text>
          <View style={styles.viewBtn}>
            <TouchableOpacity onPress={onCancelDelete} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('exit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteCustomer} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          <Text style={styles.txtTitleHeader}>{infoCustomer?.name}</Text>
          <TouchableOpacity onPress={toggleModalDelete}>
            <Icon3dotMore
              width={responsiveHeight(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view content */}
      <View style={styles.viewContent}>
        {/* view info */}
        <RenderItemCollapse
          isChecked={stateInfo.info}
          onPress={() => onSetStateInfo('info')}
          title={I18n.t('detailInformation')}
        />
        {stateInfo.info && (
          <View>
            <View style={styles.viewHeaderContentInfo}>
              <Text style={styles.titleContact}>
                {I18n.t('editInformation').toUpperCase()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Stack', {
                    screen: 'EditDetailInfoCustomer',
                    params: {data: infoCustomer, documentId: documentId},
                  })
                }
                style={styles.viewIconEdit}>
                <IconEdit
                  width={responsiveHeight(15)}
                  height={responsiveHeight(15)}
                  fill={Colors.gray}
                />
              </TouchableOpacity>
            </View>
            <DetailInfoCustomer data={infoCustomer} />
          </View>
        )}
        {/* view address */}
        <View style={styles.viewContentAddress}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSetStateInfo('address')}
            style={styles.viewItemHeader}>
            <Text style={styles.txtTitle}>{I18n.t('address')}</Text>
            <View style={stateInfo.address ? styles.viewClickIconItem : null}>
              <IconArrowRight
                width={responsiveHeight(20)}
                height={responsiveHeight(20)}
              />
            </View>
          </TouchableOpacity>
          {stateInfo.address && (
            <View style={styles.viewItemAddress}>
              <View style={styles.viewInput}>
                <Text style={styles.txtTextAddress}>
                  {infoCustomer?.address}
                </Text>
                <View style={styles.line} />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Stack', {
                    screen: 'EditAddressCustomer',
                    params: {
                      address: infoCustomer?.address,
                      documentId: documentId,
                    },
                  })
                }
                style={styles.viewIconEdit}>
                <IconEdit
                  width={responsiveHeight(15)}
                  height={responsiveHeight(15)}
                  fill={Colors.gray}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <RenderItem
          onPress={() =>
            navigation.navigate('Stack', {
              screen: 'DebtCustomer',
              documentId: documentId,
            })
          }
          title={I18n.t('debt')}
        />
        <RenderItem
          onPress={() =>
            navigation.navigate('Stack', {
              screen: 'PurchaseHistoryCustomer',
              params: {documentId: documentId},
            })
          }
          title={I18n.t('purchaseHistory')}
        />
        <Note contentNote={contentNote} toggleModal={toggleModal} />
      </View>
    </View>
  );
};

export default DetailCustomer;
