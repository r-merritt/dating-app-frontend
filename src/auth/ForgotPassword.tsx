import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function ForgotPassword({toggleAuthType}: {toggleAuthType: Function}) {
  return (
    <View>
      <Text>Hi I'm ForgotPassword</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
