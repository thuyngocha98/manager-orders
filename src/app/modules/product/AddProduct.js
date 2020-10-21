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
import styles from '@modules/product/styles/addProduct.styles';
import Header from '@components/Header';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import ItemInfoProduct from '@modules/product/components/ItemInputInfoProduct';
import ImagePicker from 'react-native-image-crop-picker';
import SwitchBase from '@components/SwitchBase';
import ItemInputAmountProduct from '@modules/product/components/ItemInputAmountProduct';
import ItemInputUnitProduct from '@modules/product/components/ItemInputUnitProduct';
import ListUnit from '@modules/product/constants/ListUnit';
import BottomModalBase from '@components/BottomModalBase';
import ModalLoading from '@components/ModalLoading';
import ItemTitleAndCheckMark from '@modules/product/components/ItemTitleAndCheckMark';
import uuidv4 from '@utils/Uuidv4Utils';
import {useSelector, useDispatch} from 'react-redux';
import {IMAGE_UPLOAD} from '@const/KeyAsyncStorage';
import ItemImageProduct from '@modules/product/components/ItemImageProduct';
import {
  reduxAddProduct,
  reduxUpdateLinkImageProduct,
} from '@actions/productAction';
import {
  uploadImageAsPromise,
  onSaveImageToTemp,
} from '@services/firebase/UploadImage';
import number2money from '@utils/NumberToMoney';
import moment from 'moment';
import 'moment/locale/vi';
// set locale vn
moment.locale('vi');

const MaxFileImage = 3;
const AddProduct = ({navigation}) => {
  const [stateInfoProduct, setStateInfoProduct] = React.useState({
    productName: '',
    size: '',
    productCode: '',
    retailPrice: '',
    businessPrice: '',
    importPrice: '',
    description: '',
    amount: 1,
    unit: ListUnit[0].title,
  });
  const [isEnabledSwitch, setIsSwitchEnabled] = React.useState(true);
  const [listImageProduct, setListImageProduct] = React.useState([]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSelectUnit, setIsSelectUnit] = React.useState(0);
  const [isModalVisibleLoading, setModalVisibleLoading] = React.useState(false);
  const {networkStatus} = useSelector(states => ({
    networkStatus: states.product.networkStatus,
  }));

  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
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
  // select unit amount of product
  const onSelectUnit = (item, index) => {
    setIsSelectUnit(index);
    setStateInfoProduct({
      ...stateInfoProduct,
      unit: item.title,
    });
  };

  const onUploadImage = async documentId => {
    setModalVisibleLoading(true);
    for (var image of listImageProduct) {
      const ext = image.path.split('.').pop();
      const fileName = `${uuidv4()}.${ext}`;
      await onSaveImageToTemp(image.path, fileName, documentId, IMAGE_UPLOAD);
      if (networkStatus) {
        let linkImage = await uploadImageAsPromise(
          fileName,
          documentId,
          IMAGE_UPLOAD,
        );
        if (linkImage) {
          dispatch(
            reduxUpdateLinkImageProduct({
              userId: user.uid,
              documentId: documentId,
              linkImage: linkImage,
            }),
          );
        }
      } else {
        dispatch(
          reduxUpdateLinkImageProduct({
            userId: user.uid,
            documentId: documentId,
            linkImage: fileName,
          }),
        );
      }
    }
    setModalVisibleLoading(false);
  };

  const addDataProduct = async () => {
    Keyboard.dismiss();
    const time = moment()
      .utcOffset(7)
      .format('x');
    let documentId = uuidv4();
    await dispatch(
      reduxAddProduct({
        userId: user.uid,
        documentId: documentId,
        data: {
          productName: stateInfoProduct.productName,
          size: stateInfoProduct.size,
          productCode: stateInfoProduct.productCode,
          retailPrice: stateInfoProduct.retailPrice,
          businessPrice: stateInfoProduct.businessPrice,
          importPrice: stateInfoProduct.importPrice,
          description: stateInfoProduct.description,
          amount: stateInfoProduct.amount,
          unit: stateInfoProduct.unit,
          images: [],
          enableSell: isEnabledSwitch,
          createAt: parseInt(time, 10),
        },
      }),
    );
    if (listImageProduct.length > 0) {
      await onUploadImage(documentId);
    } else {
      onNavigate();
    }
  };

  const onNavigate = () => {
    navigation.navigate('Stack', {screen: 'Product'});
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
          <Text style={styles.txtTitleHeader}>{I18n.t('addProduct')}</Text>
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
              placeholder={I18n.t('enterProductName')}
              value={stateInfoProduct.productName}
              onChangeText={text => onChangeText(text, 'productName')}
              filed={'productName'}
            />
            <ItemInfoProduct
              title={I18n.t('size')}
              placeholder={I18n.t('enterSize')}
              value={stateInfoProduct.size}
              onChangeText={text => onChangeText(text, 'size')}
              filed={'size'}
            />
            <ItemInfoProduct
              title={`${I18n.t('productCode')} / SKU`}
              placeholder={`${I18n.t('enterProductCode')} / SKU`}
              value={stateInfoProduct.productCode}
              onChangeText={text => onChangeText(text, 'productCode')}
              filed={'productCode'}
            />
            <ItemInfoProduct
              title={I18n.t('retailPrice')}
              placeholder={I18n.t('enterRetailPrice')}
              value={number2money(stateInfoProduct.retailPrice)}
              onChangeText={text =>
                onChangeText(text.replace(/,/g, ''), 'retailPrice')
              }
              filed={'retailPrice'}
              keyboardType="numeric"
            />
            <ItemInfoProduct
              title={I18n.t('businessPrice')}
              placeholder={I18n.t('enterBusinessPrice')}
              value={number2money(stateInfoProduct.businessPrice)}
              onChangeText={text =>
                onChangeText(text.replace(/,/g, ''), 'businessPrice')
              }
              filed={'businessPrice'}
              keyboardType="numeric"
            />
            <ItemInfoProduct
              title={I18n.t('importPrice')}
              placeholder={I18n.t('enterImportPrice')}
              onChangeText={text =>
                onChangeText(text.replace(/,/g, ''), 'importPrice')
              }
              value={number2money(stateInfoProduct.importPrice)}
              filed={'importPrice'}
              keyboardType="numeric"
            />
            <ItemInfoProduct
              title={I18n.t('description')}
              placeholder={I18n.t('enterDescription')}
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
                  placeholder={'0'}
                  keyboardType="numeric"
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
          {/* view switch allow sell */}
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

export default AddProduct;
