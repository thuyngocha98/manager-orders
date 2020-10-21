import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '@modules/extend/styles/profile.styles';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Header from '@components/Header';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import I18n from '@assets/localization/I18n';
import IconEdit from '@assets/iconSvg/IconEdit';
import Colors from '@const/Colors';
import ItemBase from '@modules/customer/components/ItemBase';
import {useSelector} from 'react-redux';
import IconUser from '@assets/iconSvg/IconUser';

const Profile = ({navigation}) => {
  const {user} = useSelector(states => ({user: states.auth.user}));
  return (
    <View style={styles.container}>
      {/* view header */}
      <Header>
        <View style={styles.contentHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('account')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Stack', {
                screen: 'EditProfile',
                params: {name: user.displayName},
              });
            }}
            style={styles.viewIconEdit}>
            <IconEdit
              width={responsiveHeight(15)}
              height={responsiveHeight(15)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={styles.viewContent}>
        <View style={styles.viewAbsolute} />
        <View style={styles.viewAvatar}>
          <View style={styles.viewAbsoluteAvatar}>
            <IconUser
              width={responsiveHeight(75)}
              height={responsiveHeight(75)}
            />
          </View>
          {user?.photoURL && (
            <Image source={{uri: user?.photoURL}} style={styles.avatar} />
          )}
        </View>
        <View style={styles.viewInfo}>
          <ItemBase title={I18n.t('fullName')} content={user.displayName} />
          <ItemBase title={I18n.t('phoneNumber')} content={user.phoneNumber} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
