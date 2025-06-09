import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Message({message, selfAuthor}: {message: any, selfAuthor: boolean}) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var date = new Date(message.Timestamp);

  return (
    <View>
        <Text style={styles.info}>{months[date.getMonth()]} {date.getDate()} From: {message.User}</Text>
        <Text style={selfAuthor? styles.self : styles.other}>{message.Content}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  info: {
    alignSelf: 'center',
    fontSize: 'smaller',
  },
  other: {
    flex: 1,
    backgroundColor: '#fbf3d7',
    alignSelf: 'flex-start',
    margin: '1em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    paddingRight: '1em',
    paddingLeft: '1em',
    borderRadius: '15px',
  },
  self: {
    flex: 1,
    backgroundColor: '#d9fbd7',
    alignSelf: 'flex-end',
    margin: '1em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    paddingRight: '1em',
    paddingLeft: '1em',
    borderRadius: '15px',
  },
  link: {
    color: 'blue',
    marginVertical: 5
  },
});
