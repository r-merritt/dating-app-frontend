import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../App';

import Message from './components/Message';
import Input from './components/Input';

export default function MessageThread({route, navigation}: {route: any, navigation: any}) {
  const [messageId, setMessageId] = useState();
  const [messageHistory, setMessageHistory] = useState();
  const [newMessage, setNewMessage] = useState();
  const [otherUser, setOtherUser] = useState();
  const username = useContext(AuthContext);

  useEffect(() => {
    if (route.params) {
      setMessageId(route.params.messageId);
      if (route.params.otherUser) {
        setOtherUser(route.params.otherUser);
      }
    }
  }, [route.params]);

  function goToNavList() {
    navigation.navigate('NavList');
  };

  function onChangeText(type : string, text : string) {
    setNewMessage(text);
  }

  async function sendMessage() {
    console.log('post message ', messageId, username, newMessage);
    try {
      var body = {username: username, otherUser: otherUser, messageId: messageId, message: newMessage};
      var request = new Request("http://localhost:3000/postmessage", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
      },
      });
      await fetch(request)
      .then((result) => {return result.json();})
      .then((data) => {
        if (data.Item) {
          setMessageHistory(data.Item.History);
          setMessageId(data.Item.SK);
          route.params.messageId = messageId;
        } else {
          setMessageHistory(data.result);
        }
      });
      console.log('message sent');
    } catch (err) {
      console.log('error sending message', err);
    }
  }

  useEffect(() => {
    if (!messageId) {
      setMessageHistory([]);
    } else {
    fetch(`http://localhost:3000/getmessagehistory?id=${messageId}`)
    .then((result) => {return result.json();})
    .then((data) => {setMessageHistory(data.Item.History);})
    .catch((error) => {console.log(error.message);});}},
    [messageId]);

  return (
    <View style={styles.container}>
            {messageHistory && (
              <ScrollView style={styles.messageContainer}>
                {messageHistory.map(function(message, key){
                    return <Message key={key} message={message} selfAuthor={message.User == username} />;
                })}
              </ScrollView>
              )}
          <Input
            placeholder='Type a message'
            type='message'
            onChangeText={onChangeText}
          />

          <Button title="Send message" onPress={sendMessage} />

          <Text onPress={goToNavList} style={styles.link}>Nav List</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  messageContainer: {
    padding: '1em',
    maxWidth: '40%',
  },
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
