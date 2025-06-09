import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../App';

import { useFocusEffect } from '@react-navigation/native';

import { Auth as AmplifyAuth } from 'aws-amplify';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Splash({navigation}: {navigation: any}) {
    const username = useContext(AuthContext);

    console.log("Splash");

        useEffect(
            React.useCallback(() => {
              // check if new user
              if (!username) {
                return;
              }
              fetch(`http://localhost:3000/checknew?user=${username}`)
              .then((result) => {return result.json();})
              .then((data) => 
                {
                    var newStatus = data.Item.NewUser;
                    if (newStatus) {
                      console.log('new user');
                      navigation.navigate('UpdateProfile');
                    }
                    else {
                      console.log('not a new user');
                      navigation.navigate('Messages');
                    }
                })
              .catch((error) => {console.log(error.message);});
            }, [username])
        );

      useFocusEffect(
          React.useCallback(() => {
              AmplifyAuth.currentAuthenticatedUser().catch((err) => {
                  console.log('user is not signed in')
                  navigation.navigate('Auth');
              });
          }, [])
      );

      function goToNavList() {
        navigation.navigate('NavList');
      };
  

  return (
    <View style={styles.container}>
        <Text>Hello this is the Splash screen</Text>
        <Text onPress={goToNavList} style={styles.link}>Nav List</Text>
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
