import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from '@modules/product/styles/detailProduct.styles';
import Header from '@components/Header';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import IconEdit from '@assets/iconSvg/IconEdit';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import IconHome from '@assets/iconSvg/IconHome';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import IconRecycleBin from '@assets/iconSvg/IconRecycleBin';
import IconClear from '@assets/iconSvg/IconClear';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import ItemInfoProductBase from '@modules/product/components/ItemInfoProductBase';
import BottomModalBase from '@components/BottomModalBase';
import {useSelector, useDispatch} from 'react-redux';
import {reduxDeleteProduct} from '@actions/productAction';
import {deleteImageProduct} from '@services/firebase/UploadImage';
import firestore from '@react-native-firebase/firestore';
import number2money from '@utils/NumberToMoney';
import IconSync from '@assets/iconSvg/IconSync';
import SelectPathImage from '@utils/SelectPathImage';

const DetailProduct = ({route, navigation}) => {
  const {documentId} = route.params; // params from product screen
  const [isModalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(states => ({user: states.auth.user}));
  const [infoProduct, setInfoProduct] = React.useState({});
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('product')
      .doc(documentId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setInfoProduct(documentSnapshot.data());
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  const onDeleteProduct = async () => {
    await infoProduct?.images?.forEach(downLoadURL => {
      deleteImageProduct(downLoadURL);
    });
    await dispatch(
      reduxDeleteProduct({userId: user.uid, productId: documentId}),
    );
    toggleModal();
    navigation.navigate('Stack', {screen: 'Product'});
  };
  return (
    <View style={styles.container}>
      {/* view modal */}
      <BottomModalBase isModalVisible={isModalVisible}>
        <View style={styles.viewModalBottom}>
          <Text style={styles.txtTitleModal}>{I18n.t('deleteProduct')}</Text>
          <Text style={styles.txtVerifyDelete}>
            {I18n.t('areYouSureYouWantToDeleteThisProduct')}
          </Text>
          <View style={styles.viewBtn}>
            <TouchableOpacity onPress={toggleModal} style={styles.btn}>
              <Text style={styles.txtBtn}>{I18n.t('exit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteProduct} style={styles.btn}>
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
          <Text style={styles.txtTitleHeader}>{I18n.t('productDetail')}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Stack', {
                screen: 'EditProduct',
                params: {data: infoProduct, documentId: documentId},
              })
            }>
            <IconEdit
              width={responsiveWidth(17)}
              height={responsiveHeight(17)}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view content */}
      <ScrollView style={styles.viewContent}>
        {/* view image */}
        <View style={styles.viewListImage}>
          {infoProduct?.images?.map(uri => (
            <View key={uri} style={styles.viewImage}>
              <View style={styles.viewLoading}>
                <IconSync
                  width={responsiveHeight(20)}
                  height={responsiveHeight(20)}
                  fill={Colors.gray}
                />
              </View>
              <Image
                source={
                  uri
                    ? {
                        uri: uri ? SelectPathImage(uri) : null,
                        cache: 'force-cache',
                      }
                    : null
                }
                style={styles.image}
              />
            </View>
          ))}
        </View>
        {/* view info product */}
        <View style={styles.viewInfoProduct}>
          <ItemInfoProductBase
            title={I18n.t('productName')}
            nameDetails={infoProduct.productName}
          />
          <ItemInfoProductBase
            title={I18n.t('size')}
            nameDetails={infoProduct.size}
          />
          <ItemInfoProductBase
            title={`${I18n.t('productCode')} / SKU`}
            nameDetails={infoProduct.productCode}
          />
          <ItemInfoProductBase
            title={I18n.t('retailPrice')}
            nameDetails={
              infoProduct.retailPrice
                ? number2money(infoProduct.retailPrice)
                : ''
            }
          />
          <ItemInfoProductBase
            title={I18n.t('businessPrice')}
            nameDetails={
              infoProduct.businessPrice
                ? number2money(infoProduct.businessPrice)
                : ''
            }
          />
          <ItemInfoProductBase
            title={I18n.t('importPrice')}
            nameDetails={
              infoProduct.importPrice
                ? number2money(infoProduct.importPrice)
                : ''
            }
          />
          <ItemInfoProductBase
            title={I18n.t('description')}
            nameDetails={infoProduct.description}
          />
        </View>
        {/* view stock */}
        <View style={styles.viewStock}>
          <View style={styles.viewIconWareHouseAndContent}>
            <View style={styles.viewIconWareHouse}>
              <IconHome
                width={responsiveWidth(25)}
                height={responsiveHeight(25)}
                fill={Colors.gray}
              />
            </View>
            <View style={styles.viewContentStock}>
              <Text style={styles.txtTitleWareHouse}>
                {I18n.t('warehouse')}
              </Text>
              <Text style={styles.txtInventory}>
                {I18n.t('amount')}: {infoProduct.amount}
              </Text>
            </View>
          </View>
        </View>
        {/* view allow sell */}
        <View style={styles.viewAllowSell}>
          {infoProduct.enableSell ? (
            <View style={styles.viewIconAllowSell}>
              <IconCheckMark
                width={responsiveWidth(20)}
                height={responsiveHeight(20)}
                fill={Colors.white}
              />
            </View>
          ) : (
            <View style={styles.viewIconNoneAllowSell}>
              <IconClear
                width={responsiveWidth(18)}
                height={responsiveHeight(18)}
                fill={Colors.white}
              />
            </View>
          )}
          <Text style={styles.txtAllowSell}>
            {infoProduct.enableSell
              ? I18n.t('enableSell')
              : I18n.t('disableSell')}
          </Text>
        </View>
        {/* view delete */}
        <TouchableOpacity onPress={toggleModal} style={styles.viewDelete}>
          <View style={styles.viewContentLeft}>
            <View style={styles.viewIconDelete}>
              <IconRecycleBin
                width={responsiveWidth(20)}
                height={responsiveHeight(20)}
                fill={Colors.tomato}
              />
            </View>
            <Text style={styles.txtDelete}>{I18n.t('deleteProduct')}</Text>
          </View>
          <View style={styles.viewIconDelete}>
            <IconArrowRight
              width={responsiveWidth(22)}
              height={responsiveHeight(22)}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DetailProduct;
