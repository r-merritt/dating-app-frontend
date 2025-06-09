import React from 'react';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';


export default function Match({navigation, username}: {navigation: any, username: string}) {
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [pic, setPic] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/profile?user=${username}`)
    .then((result) => {return result.json();})
    .then((data) => {
      if (data.Item.Nym) {setName(data.Item.Nym);}
      if (data.Item.Locat) {setLocation(`${data.Item.Locat.Lat} ${data.Item.Locat.Long}`);}
      if (data.Item.ProfilePicture) {setPic(data.Item.ProfilePicture);}
      })
    .catch((error) => {console.log(error.message);});
  }, []);

  function goToProfile() {
    navigation.navigate('Profile', {username: username});
  };

  return (
    <Pressable onPress={goToProfile}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Image source={pic} style={styles.image}/>
        </View>
        <View style={styles.container}>
          <Text>Hello this is is the match block for {username}</Text>
          <Text>Name: {name}</Text>
          <Text>Location: {location}</Text>
        </View>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
