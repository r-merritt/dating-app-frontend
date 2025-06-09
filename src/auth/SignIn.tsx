import React, { Component, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { Auth } from 'aws-amplify';

import Input from '../components/Input';
import ActionButton from '../components/ActionButton';

export default function SignIn({navigation, toggleAuthType}: {navigation: any, toggleAuthType: Function}) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onChangeText(type : string, text : string) {
    switch(type) {
      case 'username':
        setUsername(text);
        break;
      case 'password':
        setPassword(text);
        break;
    }
  }

  async function signIn() {
    try {
      await Auth.signIn(username, password)
      console.log('successfully signed in')
      navigation.navigate('Splash');
    } catch (err) {
      console.log('error signing in...', err)
    }
  }


  // TODO: text input should change size with screen size
  // TODO: enter button should activate sign in button
  return (
    <View>
    <Input
      onChangeText={onChangeText}
      type='username'
      placeholder='Username'
    />
    <Input
      onChangeText={onChangeText}
      type='password'
      placeholder='Password'
      secureTextEntry
    />
    <ActionButton
      title='Sign In'
      onPress={signIn}
    />
    <View style={styles.buttonContainer}>
      <Pressable onPress={() => {
          toggleAuthType('showForgotPassword');
        }}
      
      style={({pressed}) => [
      {
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#ffb100',
      }, styles.buttonContainer,
      ]}>
        <Text>Forget your password?</Text>
      </Pressable>
    </View>
  </View>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
