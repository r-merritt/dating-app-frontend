import React, { Fragment, Component, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Input from '../components/Input';
import ActionButton from '../components/ActionButton';
import { Auth } from 'aws-amplify'


export default function SignUp({toggleAuthType}: {toggleAuthType: Function}) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  // const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [signUpStage, setSignUpStage] = useState<string>('signUp');


  function onChangeText(type : string, text : string) {
    switch(type) {
      case 'username':
        setUsername(text);
        break;
      case 'password':
        setPassword(text);
        break;
      case 'email':
        setEmail(text);
        break;
      case 'authCode':
        setAuthCode(text);
        break;  
    }
  }

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email }});
      var request = new Request("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify({ username: username }),
        headers: {
          'Content-Type': 'application/json',
      },
      });
      await fetch(request);
      console.log('successful sign up..');
      setSignUpStage('confirm');
    } catch (err) {
      console.log('error signing up...', err);
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      toggleAuthType('showSignIn');
      console.log('email confirmed');
    } catch (err) {
      console.log('error signing up...', err);
    }
  }

  return (
  //   <View>
  //     <Text>Hi I'm SignUp</Text>
  //   </View>

  <View style={styles.container}>
        {
          signUpStage == 'signUp' && (
            <Fragment>
              <Input
                placeholder='Username'
                type='username'
                onChangeText={onChangeText}
              />
              <Input
                placeholder='Password'
                type='password'
                onChangeText={onChangeText}
                secureTextEntry
              />
              <Input
                placeholder='Email'
                type='email'
                onChangeText={onChangeText}
              />
              {/* 
              If you would like to enable phone number as an attribute, uncomment this field
              <Input
                placeholder='Phone Number'
                type='phoneNumber'
                onChangeText={onChangeText}
              /> */}
              <ActionButton
                title='Sign Up'
                onPress={signUp}
              />
            </Fragment>
          )
        }
        {
          signUpStage == 'confirm' && (
            <Fragment>
              <Input
                placeholder='Confirmation Code'
                type='authCode'
                onChangeText={onChangeText}
              />
              <ActionButton
                title='Confirm Sign Up'
                onPress={confirmSignUp}
              />
            </Fragment>
          )
        }
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
