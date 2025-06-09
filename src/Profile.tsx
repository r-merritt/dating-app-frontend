import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../App';
import { Image } from 'expo-image';

import { useFocusEffect } from '@react-navigation/native';

import { Auth as AmplifyAuth } from 'aws-amplify';

export default function Profile({route, navigation}: {route: any, navigation: any}) {
    const [name, setName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [pronouns, setPronouns] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const currentUser = useContext(AuthContext);

    console.log("Profile");
    
    function resetProfile() {
      setName('');
      setProfilePic('');
      setAge('');
      setPronouns('');
    }

    async function sendMessage() {
      console.log('get messages with ', username);
      fetch(`http://localhost:3000/getmessagefromuser?thisuser=${currentUser}&otheruser=${username}`)
        .then((result) => {return result.text();})
        .then((data) => {goToMessage(data);})
        .catch((error) => {console.log(error.message);});
    }

    function goToMessage(id) {
      console.log('message id ', id);
      navigation.navigate('MessageThread', {messageId: id, otherUser: username});
    };

    useEffect(() => {
      if (!username) {
        return;
      }
      fetch(`http://localhost:3000/profile?user=${username}`)
      .then((result) => 
        {return result.json();})
      .then((data) => 
        {
            var profile = data.Item;
            if(profile.Nym) {setName(profile.Nym);}
            if(profile.ProfilePicture) {setProfilePic(profile.ProfilePicture);}
            if(profile.Age) {setAge(profile.Age);}
            if(profile.Pronouns) {setPronouns(profile.Pronouns);}
            if(profile.Locat) {setLocation(`${profile.Locat.Lat}, ${profile.Locat.Long}`);}
        })
      .catch((error) =>
         {console.log(error.message);});
    },[username]);

    useFocusEffect(
        React.useCallback(() => {
            AmplifyAuth.currentAuthenticatedUser().catch((err) => {
                console.log('user is not signed in')
                navigation.navigate('Auth');
            });
        }, [])
    );

    useFocusEffect(() => {
      if (route.params && route.params.username) {
        setUsername(route.params.username);
      } else {
        setUsername(currentUser);
      }
    });

    function goToNavList() {
      navigation.navigate('NavList');
    };

  return (
    <View style={styles.container}>
        <Text>Hello this is {username}'s Profile</Text>
        <Text>Profile pic:</Text>
        <Image source={profilePic} style={styles.image}/>
        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
        <Text>Pronouns: {pronouns}</Text>
        <Text>Location: {location}</Text>
        
        {username != currentUser && (
          <Text onPress={sendMessage} style={styles.link}>Send a message</Text>
        )}

        {username == currentUser && (
          <Button title="Update Profile" onPress={() => navigation.navigate('UpdateProfile')} />
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
  image: {
    width: 150,
    height: 150,
    padding: 15,
  },
});
