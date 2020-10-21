import React from 'react';
import MyTabs from '@config/router/MainTabNavigator';
import {MyStack} from '@config/router/StackNavigator';
import {MyAuthStack} from '@config/router/StackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Splash from '@modules/auth/Splash';

const RootStack = createStackNavigator();
function AppNavigator() {
  const {user} = useSelector(states => ({user: states.auth.user}));
  const {isLoading} = useSelector(states => ({
    isLoading: states.auth.isLoading,
  }));

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {user != null ? (
        <RootStack.Navigator>
          <RootStack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              header: () => {
                null;
              },
            }}
          />
          <RootStack.Screen
            name="Stack"
            component={MyStack}
            options={{
              header: () => {
                null;
              },
            }}
          />
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator>
          <RootStack.Screen
            name="Auth"
            component={MyAuthStack}
            options={{
              header: () => {
                null;
              },
            }}
          />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
