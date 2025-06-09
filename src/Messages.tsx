import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../App';

import { Auth as AmplifyAuth } from 'aws-amplify';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Messages({navigation}: {navigation: any}) {
    const [messages, setMessages] = useState();
    const username = useContext(AuthContext);

    console.log("Messages");

    // TODO: update to return fresh results after new message thread created
    useEffect(() => {
      fetch(`http://localhost:3000/getmessages?user=${username}`)
      .then((result) => {return result.json();})
      .then((data) => {setMessages(data.Items);})
      .catch((error) => {console.log(error.message);});},[]);

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

    function goToMessage(id) {
      navigation.navigate('MessageThread', {messageId: id});
    };

  return (
    <View style={styles.container}>
        <Text>Hello this is Messages</Text>
        
        {messages && (
          <View>
            {messages.map(function(message, key){
                return <Text style={styles.link} key={key} onPress={() => goToMessage(message.ID)}>Message with {message.SK}</Text>;
            })}
          </View>
          )}

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
