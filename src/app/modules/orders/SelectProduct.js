import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Header from '@components/Header';
import IconArrowUp from '@assets/iconSvg/IconArrowUp';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import IconFilter from '@assets/iconSvg/IconFilter';
import styles from '@modules/orders/styles/selectProduct.styles';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import BottomModalBase from '@components/BottomModalBase';
import SearchBase from '@components/SearchBase';
import ItemSettingFilter from '@modules/product/components/ItemSettingFilter';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import {useSelector} from 'react-redux';
import number2money from '@utils/NumberToMoney';
import IconSync from '@assets/iconSvg/IconSync';
import SelectPathImage from '@utils/SelectPathImage';

export default function SelectProduct({navigation}) {
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
    businessPrice: false,
  });
  const [typeProduct, setTypeProduct] = React.useState({
    allProduct: true,
    canSell: false,
    inventory: false,
  });
  const [typePrice, setTypePrice] = React.useState('retailPrice');
  const [productFilter, setProductFilter] = React.useState(
    listProduct.map(item => ({...item, selected: false})),
  );

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
        businessPrice: false,
      });
      setTypePrice('retailPrice');
      toggleModalSelectFilter();
    } else {
      setCheckSettingFilter({
        ...isCheckSettingFilter,
        retailPrice: false,
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

  const ItemProduct = React.useCallback(
    ({item, onPress}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.viewItemProduct}>
        {item.selected && (
          <View style={styles.viewCheck}>
            <IconCheckMark
              width={responsiveWidth(10)}
              height={responsiveHeight(10)}
              fill={Colors.white}
            />
          </View>
        )}
        <View
          style={[
            styles.viewImage,
            item.selected && styles.itemSelectedOpacity,
          ]}>
          <View
            style={[
              styles.viewLoading,
              item.selected && styles.itemSelectedOpacity,
            ]}>
            <IconSync
              width={responsiveHeight(20)}
              height={responsiveHeight(20)}
              fill={Colors.gray}
            />
          </View>
          <Image
            source={
              item?.images[0]
                ? {
                    uri: item?.images[0]
                      ? SelectPathImage(item.images[0])
                      : null,
                    cache: 'force-cache',
                  }
                : null
            }
            style={styles.image}
          />
        </View>
        <View
          style={[
            styles.viewContent,
            item.selected && styles.itemSelectedOpacity,
          ]}>
          <View style={styles.viewNameProduct}>
            <Text numberOfLines={2} style={styles.txtNameProduct}>
              {item.productName}
            </Text>
          </View>
          <View style={styles.viewPriceAndAmount}>
            <Text style={styles.txtPrice}>{number2money(item[typePrice])}</Text>
            <Text style={styles.txtAmount}>{item.amount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [typePrice],
  );

  const renderItem = ({item, index}) => (
    <ItemProduct onPress={() => onPressHandler(index)} item={item} />
  );

  const onPressHandler = index => {
    let renderData = productFilter;
    renderData[index].selected = !renderData[index].selected;
    setProductFilter([...renderData]);
  };

  const onSelectProduct = async () => {
    let data = await productFilter.filter(product => {
      return product.selected === true;
    });
    navigation.navigate('MyTabs', {
      screen: 'Add',
      params: {productSelected: data},
    });
  };

  const {retailPrice, businessPrice} = isCheckSettingFilter;
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
          <Text style={styles.txtTitleHeader}>{I18n.t('selectProduct')}</Text>
          <TouchableOpacity onPress={onSelectProduct}>
            <IconCheckMark
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
              fill={Colors.white}
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
          keyboardShouldPersistTaps="handled"
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
