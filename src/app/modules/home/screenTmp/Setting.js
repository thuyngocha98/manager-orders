import React from 'react';
import {Button} from 'react-native';
import styles from '@modules/home/styles/styles';
import {reduxAuthLogOut} from '@actions/authAction';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function Setting() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => dispatch(reduxAuthLogOut())}
        title="Log Out"
        color="#841584"
      />
    </SafeAreaView>
  );
}
