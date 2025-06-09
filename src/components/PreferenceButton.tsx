import React from 'react';
import { useState, useEffect } from 'react';
import {
  Pressable, Text, View, StyleSheet
} from 'react-native';


export default function PreferenceButton({onPress, type, selected}: {onPress : Function, type : string, selected : boolean}) {
  const [bgColor, setBgColor] = useState('#ffb100');
  

  useEffect(() => {
    if (selected && type == "Acceptable") {
      setBgColor('#ab3722');
    } else if (selected && type == "Preferred") {
      setBgColor('#41a120');
    }
    else {
      setBgColor('#ffb100');
    }
  },[selected])

  return (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      {
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : bgColor,
      }, styles.buttonContainer,
    ]}
    underlayColor='#ffbf2d'
  >
    <View style={styles.button}>
      <Text style={styles.buttonText}>{type}</Text>
    </View>
  </Pressable>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});