import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '@modules/extend/styles/editProfile.styles';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Header from '@components/Header';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import I18n from '@assets/localization/I18n';
import {Hoshi} from 'react-native-textinput-effects';
import Colors from '@const/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {reduxUpdateUser} from '@actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import ModalLoading from '@components/ModalLoading';
import uuidv4 from '@utils/Uuidv4Utils';
import {
  uploadImageAsPromise,
  onSaveImageToTemp,
} from '@services/firebase/UploadImage';
import {AVATAR_UPLOAD} from '@const/KeyAsyncStorage';
const EditProfile = ({route, navigation}) => {
  const {name} = route.params;
  const [textSearch, setTextSearch] = React.useState(name);
  const [isModalVisibleLoading, setModalVisibleLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();
  const {networkStatus} = useSelector(states => ({
    networkStatus: states.product.networkStatus,
  }));
  const onImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageMaxHeight: 640,
      compressImageMaxWidth: 480,
      compressImageQuality: 0.8,
    })
      .then(images => {
        setImage(images);
      })
      .catch(e => console.log(e));
  };

  const onSaveInfoAccount = async () => {
    if (networkStatus) {
      setModalVisibleLoading(true);
      await dispatch(
        reduxUpdateUser({objectDataEdit: {displayName: textSearch}}),
      );
      if (image) {
        const ext = image.path.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        let documentId = uuidv4();
        await onSaveImageToTemp(
          image.path,
          fileName,
          documentId,
          AVATAR_UPLOAD,
        );
        if (networkStatus) {
          let linkImage = await uploadImageAsPromise(
            fileName,
            documentId,
            AVATAR_UPLOAD,
          );
          await dispatch(
            reduxUpdateUser({objectDataEdit: {photoURL: linkImage}}),
          );
        }
      }
      setModalVisibleLoading(false);
    }
  };

  const onNavigate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* view loading when add product */}
      <ModalLoading
        isModalVisibleLoading={isModalVisibleLoading}
        onNavigate={onNavigate}
        title={I18n.t('saving')}
      />
      {/* view header */}
      <Header>
        <View style={styles.contentHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('editInformation')}</Text>
          <TouchableOpacity onPress={onSaveInfoAccount}>
            <IconCheckMark
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {!networkStatus && (
        <Text style={styles.txtNotification}>
          {I18n.t('pleaseTurnOnInternetToUpdateAccount')}
        </Text>
      )}
      <View style={styles.viewContent}>
        <View style={styles.viewAbsolute} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onImagePicker}
          style={styles.viewAvatar}>
          {image?.path ? (
            <Image source={{uri: image?.path}} style={styles.avatar} />
          ) : (
            <Image
              source={require('@assets/images/addImage.png')}
              style={styles.avatarAdd}
            />
          )}
        </TouchableOpacity>
        <View style={styles.viewTextInput}>
          <Hoshi
            onChangeText={text => setTextSearch(text)}
            value={textSearch}
            autoFocus
            labelStyle={styles.inputLabel}
            inputStyle={styles.inputStyle}
            label={I18n.t('fullName')}
            style={styles.containerInput}
            borderColor={Colors.lightGreen}
            borderHeight={2}
            inputPadding={responsiveHeight(15)}
            backgroundColor={Colors.white}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
