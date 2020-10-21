import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from '@modules/auth/LogIn';
import Introduce from '@modules/auth/Introduce';
import Blank from '@modules/home/screenTmp/Blank';
import DetailOrder from '@modules/orders/DetailOrder';
import DetailProduct from '@modules/product/DetailProduct';
import EditProduct from '@modules/product/EditProduct';
import AddProduct from '@modules/product/AddProduct';
import Product from '@modules/product/Product';
import StatusOrders from '@modules/home/StatusOrders';
import SelectProduct from '@modules/orders/SelectProduct';
import SelectCustomer from '@modules/orders/SelectCustomer';
import AddCustomer from '@modules/customer/AddCustomer';
import DetailCustomer from '@modules/customer/DetailCustomer';
import DetailInfoCustomer from '@modules/customer/DetailInfoCustomer';
import EditDetailInfoCustomer from '@modules/customer/EditDetailInfoCustomer';
import EditAddressCustomer from '@modules/customer/EditAddressCustomer';
import PurchaseHistoryCustomer from '@modules/customer/PurchaseHistoryCustomer';
import DebtCustomer from '@modules/customer/DebtCustomer';
import Notification from '@modules/extend/Notification';
import Profile from '@modules/extend/Profile';
import EditProfile from '@modules/extend/EditProfile';
// CREATE AUTH STACK
const AuthStack = createStackNavigator();
export function MyAuthStack() {
  return (
    <AuthStack.Navigator initialRouteName="Introduce">
      <AuthStack.Screen
        name="Introduce"
        component={Introduce}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <AuthStack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          header: () => {
            null;
          },
        }}
      />
    </AuthStack.Navigator>
  );
}

// CREATE STACK
const Stack = createStackNavigator();
export function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Blank">
      <Stack.Screen
        name="Blank"
        component={Blank}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="SelectProduct"
        component={SelectProduct}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="SelectCustomer"
        component={SelectCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="DetailCustomer"
        component={DetailCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="DetailInfoCustomer"
        component={DetailInfoCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="EditDetailInfoCustomer"
        component={EditDetailInfoCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="EditAddressCustomer"
        component={EditAddressCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="PurchaseHistoryCustomer"
        component={PurchaseHistoryCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="DebtCustomer"
        component={DebtCustomer}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="StatusOrders"
        component={StatusOrders}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: () => {
            null;
          },
        }}
      />
    </Stack.Navigator>
  );
}
