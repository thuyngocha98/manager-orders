import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '@components/Header';
import IconArrowUp from '@assets/iconSvg/IconArrowUp';
import IconPlus from '@assets/iconSvg/IconPlus';
import IconFilter from '@assets/iconSvg/IconFilter';
import styles from '@modules/product/styles/product.styles';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import ItemProduct from '@modules/product/components/ItemProduct';
import BottomModalBase from '@components/BottomModalBase';
import SearchBase from '@components/SearchBase';
import ItemSettingFilter from '@modules/product/components/ItemSettingFilter';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import {useSelector} from 'react-redux';

export default function Product({navigation}) {
  const {listProduct} = useSelector(states => ({
    listProduct: states.product.listProduct,
  }));

  const [isKeyboardShow, setIsKeyboardShow] = React.useState(false);
  const [
    isModalVisibleProductType,
    setModalVisibleProductType,
  ] = React.useState(false); // state modal select type product
  const [textSearch, setTextSearch] = React.useState('');
  const [isModalVisibleFilter, setModalVisibleFilter] = React.useState(false); // state modal select filter
  const [isCheckSettingFilter, setCheckSettingFilter] = React.useState({
    retailPrice: true,
    importPrice: false,
    businessPrice: false,
  });
  const [typeProduct, setTypeProduct] = React.useState({
    allProduct: true,
    canSell: false,
    inventory: false,
  });
  const [typePrice, setTypePrice] = React.useState('retailPrice');
  const [productFilter, setProductFilter] = React.useState(listProduct);
  React.useEffect(() => {
    setProductFilter([...listProduct]);
  }, [listProduct]);

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

  // toggle bottom modal select type product
  const toggleModalSelectProductType = () => {
    setModalVisibleProductType(!isModalVisibleProductType);
  };

  // toggle bottom modal select filter
  const toggleModalSelectFilter = () => {
    setModalVisibleFilter(!isModalVisibleFilter);
  };

  const setStateFilterPricePolicy = number => {
    if (number === 1) {
      setCheckSettingFilter({
        ...isCheckSettingFilter,
        retailPrice: true,
        importPrice: false,
        businessPrice: false,
      });
      setTypePrice('retailPrice');
      toggleModalSelectFilter();
    } else if (number === 2) {
      setCheckSettingFilter({
        ...isCheckSettingFilter,
        retailPrice: false,
        importPrice: true,
        businessPrice: false,
      });
      setTypePrice('importPrice');
      toggleModalSelectFilter();
    } else {
      setCheckSettingFilter({
        ...isCheckSettingFilter,
        retailPrice: false,
        importPrice: false,
        businessPrice: true,
      });
      setTypePrice('businessPrice');
      toggleModalSelectFilter();
    }
  };

  const functionFilterProduct = async boolean => {
    const newData = await listProduct.filter(product => {
      return product.enableSell === boolean;
    });
    setProductFilter(newData);
  };

  const filterListProduct = async name => {
    if (name === 'allProduct') {
      await setProductFilter(listProduct);
      setTypeProduct({
        allProduct: true,
        canSell: false,
        inventory: false,
      });
      toggleModalSelectProductType();
    } else if (name === 'canSell') {
      await functionFilterProduct(true);
      setTypeProduct({
        allProduct: false,
        canSell: true,
        inventory: false,
      });
      toggleModalSelectProductType();
    } else if (name === 'inventory') {
      await functionFilterProduct(false);
      setTypeProduct({
        allProduct: false,
        canSell: false,
        inventory: true,
      });
      toggleModalSelectProductType();
    }
  };

  const onFilterSearch = async text => {
    setTypeProduct({
      allProduct: true,
      canSell: false,
      inventory: false,
    });
    setTextSearch(text);
    const newData = await listProduct.filter(product => {
      const nameProduct = product.productName.toUpperCase();
      const textData = text.toUpperCase();
      return nameProduct.indexOf(textData) > -1;
    });
    setProductFilter(newData);
  };

  const renderItem = ({item}) => (
    <ItemProduct
      onPress={() =>
        navigation.navigate('Stack', {
          screen: 'DetailProduct',
          params: {documentId: item.id},
        })
      }
      item={item}
      typePrice={typePrice}
    />
  );

  const goToAddProduct = () => {
    navigation.navigate('Stack', {
      screen: 'AddProduct',
    });
  };

  const {retailPrice, importPrice, businessPrice} = isCheckSettingFilter;
  const {allProduct, canSell, inventory} = typeProduct;
  return (
    <View style={styles.container}>
      {/* view bottom modal select type product */}
      <BottomModalBase
        isModalVisible={isModalVisibleProductType}
        toggleModal={toggleModalSelectProductType}>
        {/* title */}
        <View style={styles.viewModalBottom}>
          <Text style={styles.txtTitleModal}>
            {I18n.t('selectProductType')}
          </Text>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => filterListProduct('allProduct')}>
            <ItemSettingFilter
              isChecked={allProduct}
              name={I18n.t('allProductType')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => filterListProduct('canSell')}>
            <ItemSettingFilter isChecked={canSell} name={I18n.t('canSell')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => filterListProduct('inventory')}>
            <ItemSettingFilter
              isChecked={inventory}
              name={I18n.t('inventory')}
            />
          </TouchableOpacity>
        </View>
      </BottomModalBase>
      {/* view bottom modal select setting filter */}
      <BottomModalBase
        toggleModal={toggleModalSelectFilter}
        isModalVisible={isModalVisibleFilter}>
        <View style={styles.viewModalFilter}>
          <Text style={styles.txtTitleModal}>{I18n.t('adjustTheDisplay')}</Text>
          <View style={styles.line} />
          <View style={styles.viewItemSelectModalFilter1}>
            <Text style={styles.txtTitleTypeModalFilter}>
              {I18n.t('pricePolicy')}
            </Text>
            <TouchableOpacity
              onPress={retailPrice ? null : () => setStateFilterPricePolicy(1)}>
              <ItemSettingFilter
                isChecked={retailPrice}
                name={I18n.t('retailPrice')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={importPrice ? null : () => setStateFilterPricePolicy(2)}>
              <ItemSettingFilter
                isChecked={importPrice}
                name={I18n.t('importPrice')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                businessPrice ? null : () => setStateFilterPricePolicy(3)
              }>
              <ItemSettingFilter
                isChecked={businessPrice}
                name={I18n.t('businessPrice')}
              />
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
          <Text style={styles.txtTitleHeader}>
            {I18n.t('inventoryManagement')}
          </Text>
          <TouchableOpacity onPress={goToAddProduct}>
            <IconPlus
              width={responsiveHeight(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
        </View>
      </Header>
      {/* view search */}
      <SearchBase
        placeholder={I18n.t('search')}
        onChangeText={text => onFilterSearch(text)}
        value={textSearch}
        text={textSearch}
        onClear={() => onFilterSearch('')}
      />
      {/* view type product */}
      <View style={styles.viewTypeProductAndFilter}>
        <TouchableOpacity
          onPress={toggleModalSelectProductType}
          style={styles.viewTypeProduct}>
          <Text style={styles.txtTitleTypeProduct}>
            {allProduct
              ? I18n.t('allProduct')
              : canSell
              ? I18n.t('canSell')
              : I18n.t('inventory')}
          </Text>
          <View style={styles.viewIconDown}>
            <IconArrowUp
              width={responsiveWidth(15)}
              height={responsiveHeight(15)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewIconFilter}
          onPress={toggleModalSelectFilter}>
          <IconFilter
            width={responsiveWidth(20)}
            height={responsiveHeight(20)}
            fill={Colors.gray}
          />
        </TouchableOpacity>
      </View>
      {/* view number item */}
      <View style={styles.viewNumberItem}>
        <View style={styles.viewAbsolute1} />
        <Text style={styles.txtNumberItem}>
          {productFilter.length} {I18n.t('product')}
        </Text>
      </View>
      {/* view list product */}
      <KeyboardAvoidingView
        style={styles.viewFlatList}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FlatList
          data={productFilter}
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
