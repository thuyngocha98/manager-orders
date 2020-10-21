import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '@modules/extend/styles/extend.styles';
import HeaderNoGoBack from '@components/HeaderNoGoBack';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import IconProduct from '@assets/iconSvg/IconProduct';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconNotification from '@assets/iconSvg/IconNotification';
import IconUser from '@assets/iconSvg/IconUser';
import {reduxAuthLogOut} from '@actions/authAction';
import {useDispatch} from 'react-redux';
import BottomModalBase from '@components/BottomModalBase';
const Extend = ({navigation}) => {
  const dispatch = useDispatch();
  const [
    isModalVisibleVerifyLogout,
    setModalVisibleVerifyLogout,
  ] = React.useState(false);

  // show hide modal
  const toggleModal = () => {
    setModalVisibleVerifyLogout(!isModalVisibleVerifyLogout);
  };

  const onLogout = () => {
    toggleModal();
    dispatch(reduxAuthLogOut());
  };

  const RenderItem = ({children, onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.viewItem}>
      {children}
      <View style={styles.viewContentItem}>
        <Text style={styles.txtTitleItem}>{title}</Text>
        <IconArrowRight
          width={responsiveWidth(18)}
          height={responsiveHeight(18)}
          fill={Colors.gray}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <BottomModalBase isModalVisible={isModalVisibleVerifyLogout}>
        <View style={styles.viewModalBottom}>
          <Text style={styles.txtTitleModal}>{I18n.t('logoutAccount')}</Text>
          <Text style={styles.txtVerifyDelete}>
            {I18n.t('areYouSureYouWantToLogout')}
          </Text>
          <View style={styles.viewBtn}>
            <TouchableOpacity onPress={toggleModal} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('exit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('logout')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModalBase>
      {/* view header */}
      <HeaderNoGoBack title={I18n.t('more')}>
        <View style={{width: responsiveWidth(20)}} />
      </HeaderNoGoBack>
      {/* view content */}
      <RenderItem
        title={I18n.t('account')}
        onPress={() => navigation.navigate('Stack', {screen: 'Profile'})}>
        <IconUser
          width={responsiveWidth(20)}
          height={responsiveHeight(18)}
          fill={Colors.gray}
        />
      </RenderItem>
      <RenderItem
        title={I18n.t('product')}
        onPress={() => navigation.navigate('Stack', {screen: 'Product'})}>
        <IconProduct
          width={responsiveWidth(20)}
          height={responsiveHeight(20)}
          fill={Colors.gray}
        />
      </RenderItem>
      <RenderItem
        title={I18n.t('notification')}
        onPress={() => navigation.navigate('Stack', {screen: 'Notification'})}>
        <IconNotification
          width={responsiveWidth(20)}
          height={responsiveHeight(20)}
          fill={Colors.gray}
        />
      </RenderItem>
      {/* view Logout */}
      <TouchableOpacity onPress={toggleModal} style={styles.viewBtnLogout}>
        <Text style={styles.txtLogout}>{I18n.t('logout')}</Text>
        <IconArrowRight
          width={responsiveWidth(18)}
          height={responsiveHeight(18)}
          fill={Colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Extend;
