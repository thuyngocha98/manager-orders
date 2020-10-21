import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import IconHome from '@assets/iconSvg/IconHome';
import IconOrders from '@assets/iconSvg/IconOrders';
import IconAdd from '@assets/iconSvg/IconAdd';
import IconCustomer from '@assets/iconSvg/IconCustomer';
import IconSetting from '@assets/iconSvg/IconSetting';
import I18n from '@assets/localization/I18n';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import styles from '@config/router/styles';
// Check platform android set flag animation layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
function TabBar({state, descriptors, navigation}) {
  //Icon TabBar
  const Icon = (name, focused) => {
    if (name === I18n.t('home')) {
      return (
        <IconHome
          fill={focused ? Colors.darkGreen : Colors.gray}
          width={responsiveWidth(23)}
          height={responsiveHeight(23)}
        />
      );
    } else if (name === I18n.t('orders')) {
      return (
        <IconOrders
          fill={focused ? Colors.darkGreen : Colors.gray}
          width={responsiveWidth(18)}
          height={responsiveHeight(23)}
        />
      );
    } else if (name === I18n.t('add')) {
      return (
        <IconAdd
          fill={focused ? Colors.darkGreen : Colors.gray}
          width={responsiveWidth(50)}
          height={responsiveHeight(50)}
        />
      );
    } else if (name === I18n.t('customer')) {
      return (
        <IconCustomer
          fill={focused ? Colors.darkGreen : Colors.gray}
          width={responsiveWidth(19)}
          height={responsiveHeight(23)}
        />
      );
    } else if (name === I18n.t('more')) {
      return (
        <IconSetting
          fill={focused ? Colors.darkGreen : Colors.gray}
          width={responsiveWidth(21)}
          height={responsiveHeight(16)}
        />
      );
    }
  };
  const [isKeyboardShow, setIsKeyboardShow] = React.useState(false);

  // function listener keyboard show hide
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      frames => {
        if (!frames.endCoordinates) {
          return;
        }
        Platform.OS === 'android' &&
          LayoutAnimation.configureNext(
            LayoutAnimation.create(
              100,
              LayoutAnimation.Types.easeInEaseOut,
              LayoutAnimation.Properties.opacity,
            ),
          );
        setIsKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      frames => {
        Platform.OS === 'android' &&
          LayoutAnimation.configureNext(
            LayoutAnimation.create(
              100,
              LayoutAnimation.Types.easeInEaseOut,
              LayoutAnimation.Properties.opacity,
            ),
          );
        setIsKeyboardShow(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardShow ? null : (
    <View style={styles.mainTabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.mTabBar}>
            <View style={styles.tabBar}>
              <View
                style={
                  label !== I18n.t('add') ? styles.viewIcon : styles.viewBtnAdd
                }>
                {Icon(label, isFocused)}
              </View>
              {label !== I18n.t('add') ? (
                <Text
                  style={isFocused ? styles.txtLabelFocus : styles.txtLabel}>
                  {label}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
