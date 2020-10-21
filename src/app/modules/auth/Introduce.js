import React from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '@modules/auth/styles/introduce.styles';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
const dataTemp = [
  {
    id: 'image1',
  },
  {
    id: 'image2',
  },
  {
    id: 'image3',
  },
];
const Introduce = ({navigation}) => {
  const [pageNum, setPageNum] = React.useState(0);
  const handleScroll = event => {
    let contentOffset = event.nativeEvent.contentOffset;
    let viewSize = event.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    let page = Math.floor(
      (contentOffset.x + 0.5 * viewSize.width) / viewSize.width,
    );
    setPageNum(page);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white}
        translucent
        barStyle="dark-content"
      />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={0}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.viewSlider}>
        {dataTemp.map(item => (
          <View key={item.id} style={styles.viewItem}>
            <Text style={styles.txtItem}>{item.id}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.viewDot}>
        {dataTemp.map((item, index) => (
          <View
            key={item.id}
            style={pageNum === index ? styles.activeDot : styles.dot}
          />
        ))}
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LogIn')}
          style={styles.btn}>
          <Text style={styles.txtBtn}>{I18n.t('loginWithPhoneNumber')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Introduce;
