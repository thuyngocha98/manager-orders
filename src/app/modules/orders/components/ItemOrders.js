import React, {memo} from 'react';
import {Text, View} from 'react-native';
import styles from '@modules/orders/styles/itemOrders.styles';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import number2money from '@utils/NumberToMoney';
import moment from 'moment';
import 'moment/locale/vi';
// set locale vn
moment.locale('vi');
const ItemOrders = ({data}) => {
  let date = moment(data.createAt)
    .utcOffset(7)
    .format('ll');
  return (
    <View style={styles.viewMainItemOrders}>
      <View style={styles.viewItemOrder}>
        <View style={styles.viewLeft}>
          <Text style={styles.txtNameItem}>{data.orderCode}</Text>
          <Text style={styles.txtTypeCustomer}>{data.customer.name}</Text>
          <Text style={styles.txtTimeItem}>{date}</Text>
        </View>
        <View style={styles.viewRight}>
          <Text style={styles.txtMoney}>{number2money(data.totalOrder)}</Text>
          <Text
            style={[
              styles.txtStatus,
              {
                color:
                  data.statusOrder === 'complete'
                    ? Colors.lightGreen
                    : data.statusOrder === 'inTransaction'
                    ? Colors.orange
                    : Colors.gray,
              },
            ]}>
            {I18n.t(data.statusOrder)}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default memo(ItemOrders);
