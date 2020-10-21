import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '@modules/product/styles/editProduct.styles';
import Header from '@components/Header';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import ItemInfoProduct from '@modules/product/components/ItemInputInfoProduct';
import SwitchBase from '@components/SwitchBase';
import ImagePicker from 'react-native-image-crop-picker';
import ItemInputAmountProduct from '@modules/product/components/ItemInputAmountProduct';
import ItemInputUnitProduct from '@modules/product/components/ItemInputUnitProduct';
import BottomModalBase from '@components/BottomModalBase';
import ItemTitleAndCheckMark from '@modules/product/components/ItemTitleAndCheckMark';
import ListUnit from '@modules/product/constants/ListUnit';
import ItemImageProduct from '@modules/product/components/ItemImageProduct';
import {useSelector, useDispatch} from 'react-redux';
import ModalLoading from '@components/ModalLoading';
import {IMAGE_UPLOAD} from '@const/KeyAsyncStorage';
import uuidv4 from '@utils/Uuidv4Utils';
import {onCleanAfterUpLoadSuccess} from '@services/firebase/UploadImage';
import {
  reduxEditProduct,
  reduxUpdateLinkImageProduct,
  reduxDeleteImageProduct,
} from '@actions/productAction';
import {
  uploadImageAsPromise,
  onSaveImageToTemp,
} from '@services/firebase/UploadImage';
import number2money from '@utils/NumberToMoney';

const MaxFileImage = 3;
const EditProduct = ({route, navigation}) => {
  const {data, documentId} = route.params; // params from DetailProduct
  const [stateInfoProduct, setStateInfoProduct] = React.useState({
    productName: data.productName,
    size: data.size,
    productCode: data.productCode,
    retailPrice: data.retailPrice,
    businessPrice: data.businessPrice,
    importPrice: data.importPrice,
    description: data.description,
    amount: data.amount,
    unit: data.unit,
  });
  const listImageOriginal = data.images;
  const [isEnabledSwitch, setIsSwitchEnabled] = React.useState(data.enableSell);
  const [listImageProduct, setListImageProduct] = React.useState(data.images);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSelectUnit, setIsSelectUnit] = React.useState(null);
  const [isModalVisibleLoading, setModalVisibleLoading] = React.useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  const {networkStatus} = useSelector(states => ({
    networkStatus: states.product.networkStatus,
  }));
  // function set show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSwitch = () =>
    setIsSwitchEnabled(previousState => !previousState);

  const onChangeText = (text, filed) => {
    setStateInfoProduct({
      ...stateInfoProduct,
      [filed]: text,
    });
  };

  const onImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageMaxHeight: 640,
      compressImageMaxWidth: 480,
      compressImageQuality: 0.8,
    })
      .then(images => {
        let allImage = listImageProduct.concat(images);
        if (allImage.length > MaxFileImage - 1) {
          allImage = allImage.slice(
            allImage.length - MaxFileImage,
            allImage.length,
          );
        } // max image
        setListImageProduct(allImage);
      })
      .catch(e => console.log(e));
  };

  // remove image from listImage product
  const removeImage = index => {
    let newList = [...listImageProduct];
    newList.splice(index, 1);
    setListImageProduct(newList);
  };

  const onUploadImage = async docId => {
    setModalVisibleLoading(true);
    for (var imageOriginal of listImageOriginal) {
      if (listImageProduct.indexOf(imageOriginal) === -1) {
        dispatch(
          reduxDeleteImageProduct({
            userId: user.uid,
            documentId: docId,
            linkImage: imageOriginal,
          }),
        );
        if (imageOriginal.indexOf('https') === -1) {
          await onCleanAfterUpLoadSuccess(imageOriginal, docId, IMAGE_UPLOAD);
        }
      }
    }
    for (var image of listImageProduct) {
      if (image?.path) {
        const ext = image.path.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        await onSaveImageToTemp(image.path, fileName, docId, IMAGE_UPLOAD);
        if (networkStatus) {
          let linkImage = await uploadImageAsPromise(
            fileName,
            docId,
            IMAGE_UPLOAD,
          );
          if (linkImage) {
            dispatch(
              reduxUpdateLinkImageProduct({
                userId: user.uid,
                documentId: docId,
                linkImage: linkImage,
              }),
            );
          }
        } else {
          dispatch(
            reduxUpdateLinkImageProduct({
              userId: user.uid,
              documentId: docId,
              linkImage: fileName,
            }),
          );
        }
      }
    }
    setModalVisibleLoading(false);
  };

  // select unit amount of product
  const onSelectUnit = (item, index) => {
    setIsSelectUnit(index);
    setStateInfoProduct({
      ...stateInfoProduct,
      unit: item.title,
    });
  };

  const addDataProduct = async () => {
    Keyboard.dismiss();
    await dispatch(
      reduxEditProduct({
        userId: user.uid,
        documentId: documentId,
        objectDataEdit: {
          productName: stateInfoProduct.productName,
          size: stateInfoProduct.size,
          productCode: stateInfoProduct.productCode,
          retailPrice: stateInfoProduct.retailPrice,
          businessPrice: stateInfoProduct.businessPrice,
          importPrice: stateInfoProduct.importPrice,
          description: stateInfoProduct.description,
          amount: stateInfoProduct.amount,
          unit: stateInfoProduct.unit,
          enableSell: isEnabledSwitch,
        },
      }),
    );
    await onUploadImage(documentId);
  };
  const onNavigate = () => {
    navigation.navigate('Stack', {screen: 'DetailProduct'});
  };
  return (
    <View style={styles.container}>
      {/* view loading when add product */}
      <ModalLoading
        isModalVisibleLoading={isModalVisibleLoading}
        onNavigate={onNavigate}
        title={I18n.t('saving')}
      />
      {/* view bottom modal select unit */}
      <BottomModalBase
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}>
        <View style={styles.viewModal}>
          <Text style={styles.txtTitleModal}>{I18n.t('selectUnits')}</Text>
          <View style={styles.line} />
          <View style={styles.viewListUnit}>
            {ListUnit.map((item, index) => (
              <TouchableOpacity
                onPress={() => onSelectUnit(item, index)}
                key={item.id}>
                <ItemTitleAndCheckMark
                  item={item}
                  isChecked={isSelectUnit === index ? true : false}
                />
              </TouchableOpacity>
            ))}
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
          <Text style={styles.txtTitleHeader}>{I18n.t('editProduct')}</Text>
          <TouchableOpacity onPress={addDataProduct}>
            <IconCheckMark
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view content */}
      <KeyboardAvoidingView
        style={styles.viewContent}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* view image */}
          <View style={styles.viewImage}>
            <View style={styles.listItemImage}>
              {listImageProduct.map((item, index) => (
                <ItemImageProduct
                  item={item}
                  key={index}
                  removeImage={() => removeImage(index)}
                />
              ))}
            </View>
            {listImageProduct.length > MaxFileImage - 1 ? null : (
              <TouchableOpacity onPress={onImagePicker}>
                <Image
                  source={require('@assets/images/addImage.png')}
                  style={styles.imageAdd}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* view info product */}
          <View style={styles.viewInfoProduct}>
            <ItemInfoProduct
              title={I18n.t('productName')}
              placeholder={data.name}
              value={stateInfoProduct.productName}
              onChangeText={text => onChangeText(text, 'productName')}
              filed={'productName'}
            />
            <ItemInfoProduct
              title={I18n.t('size')}
              placeholder={data.size}
              value={stateInfoProduct.size}
              onChangeText={text => onChangeText(text, 'size')}
              filed={'size'}
            />
            <ItemInfoProduct
              title={`${I18n.t('productCode')} / SKU`}
              placeholder={data.sku}
              value={stateInfoProduct.productCode}
              onChangeText={text => onChangeText(text, 'productCode')}
              filed={'productCode'}
            />
            <ItemInfoProduct
              title={I18n.t('retailPrice')}
              placeholder={data.retailPrice}
              value={number2money(stateInfoProduct.retailPrice)}
              onChangeText={text =>
                onChangeText(text.replace(/,/g, ''), 'retailPrice')
              }
              filed={'retailPrice'}
              keyboardType="numeric"
            />
            <ItemInfoProduct
              title={I18n.t('businessPrice')}
              placeholder={data.businessPrice}
              value={number2money(stateInfoProduct.businessPrice)}
              onChangeText={text =>
                onChangeText(text.replace(/,/g, ''), 'businessPrice')
              }
              filed={'businessPrice'}
              keyboardType="numeric"
            />
            <ItemInfoProduct
              title={I18n.t('importPrice')}
              placeholder={data.importPrice}
              onChangeText={text =>
                onChangeText(text.replace(/,/g, ''), 'importPrice')
              }
              value={number2money(stateInfoProduct.importPrice)}
              filed={'importPrice'}
              keyboardType="numeric"
            />
            <ItemInfoProduct
              title={I18n.t('description')}
              placeholder={data.description}
              value={stateInfoProduct.description}
              onChangeText={text => onChangeText(text, 'description')}
              filed={'description'}
            />
          </View>
          {/* view amount and unit product */}
          <View style={styles.viewUnit}>
            <Text style={styles.txtTitleViewUnit}>
              {I18n.t('unitCalculator')}
            </Text>
            <View style={styles.viewMainInputUnit}>
              <ItemInputAmountProduct title={I18n.t('amount')}>
                <TextInput
                  style={styles.inputUnit}
                  keyboardType="numeric"
                  placeholder={'0'}
                  value={stateInfoProduct.amount.toString()}
                  onChangeText={text => onChangeText(text, 'amount')}
                />
              </ItemInputAmountProduct>
              <ItemInputUnitProduct
                onPressSelectUnit={toggleModal}
                title={I18n.t('unit')}>
                <TextInput
                  style={styles.inputUnit}
                  placeholder={'cái'}
                  value={stateInfoProduct.unit}
                  onChangeText={text => onChangeText(text, 'unit')}
                />
              </ItemInputUnitProduct>
            </View>
          </View>
          {/* view allow sell */}
          <View style={styles.viewAllowSell}>
            <Text style={styles.txtAllowSell}>{I18n.t('enableSell')}</Text>
            <SwitchBase
              toggleSwitch={toggleSwitch}
              isEnabledSwitch={isEnabledSwitch}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProduct;
