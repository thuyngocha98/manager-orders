import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from '@modules/customer/styles/itemCustomer.styles';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
const ItemCustomer = ({item}) => {
  return (
    <View style={styles.viewItem}>
      <View style={styles.viewHeader}>
        <Text style={styles.txtName}>{item.name}</Text>
        <Text
          style={[
            styles.txtOrderStatus,
            {
              color:
                item.orderStatus === 'complete'
                  ? Colors.lightGreen
                  : item.orderStatus === 'inTransaction'
                  ? Colors.orange
                  : Colors.gray,
            },
          ]}>
          {item.orderStatus ? I18n.t(item.orderStatus) : ''}
        </Text>
      </View>
      <Text style={styles.txtPhone}>{item.phone}</Text>
      <Text numberOfLines={1} style={styles.txtAddress}>
        {item.address}
      </Text>
    </View>
  );
};

export default memo(ItemCustomer);
