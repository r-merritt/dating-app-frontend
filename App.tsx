import { useEffect, createContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Amplify } from 'aws-amplify';
import { Auth as AmplifyAuth } from 'aws-amplify';
import config from './aws-exports';

import Messages from './src/Messages';
import Profile from './src/Profile';
import Splash from './src/Splash';
import UpdateProfile from './src/UpdateProfile';
import NavList from './src/NavList';
import MatchList from './src/MatchList';
import MessageThread from './src/MessageThread';
import Auth from './src/auth/Auth';

Amplify.configure(config);

const Stack = createNativeStackNavigator();

export const AuthContext = createContext('');

export default function App() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    checkUsername();
  },[]);

  async function checkUsername() {
    AmplifyAuth.currentUserInfo()
    .then((result) => {setUsername(result.username)})
    .catch((error) => {console.log(error.message);})
  }

  function onNavChange(state: NavigationState | undefined) {
    if (state) {
      if (state.routes[state.index].name == 'Splash') {
        checkUsername();
      }
    }
  }  

  return (
    <AuthContext.Provider value={username}>
      <NavigationContainer onStateChange = {onNavChange}>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen name='Splash' component={Splash} />
          <Stack.Screen name='Messages' component={Messages} />
          <Stack.Screen name='Auth' component={Auth} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='UpdateProfile'>
            {(props) => <UpdateProfile {...props} newUser={false}/>}
          </Stack.Screen>
          <Stack.Screen name='NavList' component={NavList} />
          <Stack.Screen name='MatchList' component={MatchList} />
          <Stack.Screen name='MessageThread' component={MessageThread} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
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