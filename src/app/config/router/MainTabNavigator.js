import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '@modules/home/Dashboard';
import Orders from '@modules/orders/Orders';
import Customer from '@modules/customer/Customer';
import AddOrders from '@modules/orders/AddOrders';
import Extend from '@modules/extend/Extend';
import I18n from '@assets/localization/I18n';
import TabBar from '@config/router/TabBarComponent';
// CREATE BOTTOM TAB
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <TabBar {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={({route}) => ({
          tabBarLabel: I18n.t('home'),
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={({route}) => ({
          tabBarLabel: I18n.t('orders'),
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
      <Tab.Screen
        name="Add"
        component={AddOrders}
        options={({route}) => ({
          tabBarLabel: I18n.t('add'),
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={({route}) => ({
          tabBarLabel: I18n.t('customer'),
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
      <Tab.Screen
        name="More"
        component={Extend}
        options={({route}) => ({
          tabBarLabel: I18n.t('more'),
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
