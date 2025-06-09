import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Default({navigation}: {navigation: any}) {

    console.log("Default");

  return (
    <View style={styles.container}>
        <Text>Hello this is Default</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    marginVertical: 5
  },
});
