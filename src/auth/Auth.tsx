import React from 'react';
import { useState } from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform
} from 'react-native';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const { width } = Dimensions.get('window')

export default function Auth({navigation}: {navigation: any}) {
  const [authType, setAuthType] = useState<string>('showSignIn');

  function toggleAuthType(formType : string) {
    setAuthType(formType);
  }

  console.log("Auth");
  console.log(authType);
  
  return (
    <KeyboardAvoidingView style={styles.container}>
          <Text>It's an App</Text>
          <Text style={styles.subtitle}>Authentication Screen</Text>
          { authType == 'showSignIn' && (
            <SignIn
              navigation={navigation}
              toggleAuthType={toggleAuthType}
            />
          ) }
          { authType == 'showSignUp' && <SignUp toggleAuthType={toggleAuthType} /> }
          { authType == 'showForgotPassword' && <ForgotPassword toggleAuthType={toggleAuthType} /> }
          <View style={{ position: 'absolute', bottom: 40 }}>
            {
              authType == 'showSignUp' || authType == 'showForgotPassword' ? (
                <Text style={styles.bottomMessage}>Already signed up? <Text
                style={styles.bottomMessageHighlight}
                onPress={() => setAuthType('showSignIn')}>&nbsp;&nbsp;Sign In</Text></Text>
              ) : (
                <Text style={styles.bottomMessage}>Need an account?
                  <Text
                    onPress={() => setAuthType('showSignUp')}
                    style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Sign Up</Text>
                </Text>
              )
            }
          </View>
      </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },  
  logo: {
    height: width / 2.5
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    color: '#e19f51'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
  },
  bottomMessage: {
    fontSize: 18
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10
  }
})