import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Auth as AmplifyAuth } from 'aws-amplify';

export default function NavList({navigation}: {navigation: any}) {
    useFocusEffect(
      React.useCallback(() => {
          AmplifyAuth.currentAuthenticatedUser().catch((err) => {
              console.log('user is not signed in')
              navigation.navigate('Auth');
          });
      }, [])
    );

    console.log("NavList");

    function goToProfile() {
      navigation.navigate('Profile');
    };

    function goToMessages() {
      navigation.navigate('Messages');
    };

    function goToUpdateProfile() {
      navigation.navigate('UpdateProfile');
    };

    function goToMatchList() {
      navigation.navigate('MatchList');
    };

    async function signOut() {
      try {
        await AmplifyAuth.signOut();
        console.log('signed out');
        navigation.navigate('Auth');
      } catch (err) {
        console.log('error signing out...', err);
      }
    }



  return (
    <View style={styles.container}>
        <Text>Hello this is NavList</Text>
        <Text onPress={goToProfile} style={styles.link}>Profile</Text>
        <Text onPress={goToMessages} style={styles.link}>Messages</Text>
        <Text onPress={goToUpdateProfile} style={styles.link}>Update Profile</Text>
        <Text onPress={goToMatchList} style={styles.link}>Match List</Text>
        <Text onPress={signOut} style={styles.link}>Sign Out</Text>
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
