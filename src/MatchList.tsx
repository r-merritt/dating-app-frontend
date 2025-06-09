import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../App';

import { Auth as AmplifyAuth } from 'aws-amplify';

import Match from './components/Match';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function MatchList({navigation}: {navigation: any}) {
    const [matchedRomance, setMatchedRomance] = useState();
    const [matchedFriendship, setMatchedFriendship] = useState();
    const [listView, setListView] = useState('Romance');

    const username = useContext(AuthContext);

    console.log("Match List");

    useEffect(() => {
      fetch(`http://localhost:3000/getmatches?user=${username}`)
      .then((result) => {return result.json();})
      .then((data) => {
        setMatchedRomance(data.Item.Romance);
        setMatchedFriendship(data.Item.Friendship);
      })
      .catch((error) => {console.log(error.message);});
    }, []);

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
      <Button title="Romance" onPress={() => setListView('Romance')} />
      <Button title="Friendship" onPress={() => setListView('Friendship')} />
        
        {listView == 'Romance' && matchedRomance && (
          <View>
          {matchedRomance.map(function(user, key){
              return <Match navigation={navigation} username={user} key={key} />;
          })}
          </View>
        )
        }
        {listView == 'Friendship' && matchedFriendship && (
          <View>
          {matchedFriendship.map(function(user, key){
              return <Match navigation={navigation} username={user} key={key} />;
          })}
          </View>
        )
        }
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
