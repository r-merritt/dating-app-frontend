import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

const { width } = Dimensions.get('window')

export default function Input({placeholder, type, secureTextEntry = false, onChangeText} : {placeholder : string, type : string, secureTextEntry? : boolean, onChangeText : Function}) {
  return (
    <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={v => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor='#e2a45b'
    selectionColor={'#e2a45b'}
  />
  );
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45,
    width: width - 20,
    maxWidth: '80%',
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    color: '#e2a45b'
  }
});