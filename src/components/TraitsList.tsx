import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { Traits } from '../utils/traits';
import TraitButton from './TraitButton';


export default function TraitsList({userTraits, onChangeTrait, onClear}: {userTraits : any, onChangeTrait : Function, onClear : Function}) {
  const [collapsed, setCollapsed] = useState({});
  const [hack, setHack] = useState(true);
  const [heightCollapsed, setHeightCollapsed] = useState(true);

  const [userHeight, setUserHeight] = useState({feet: "", inches: ""});
  const [inputFeet, setInputFeet] =  useState("");
  const [inputInches, setInputInches] =  useState("");

  useEffect(() => {
    setUserHeight({feet: Math.floor(userTraits.Height / 12).toString(), inches: (userTraits.Height % 12).toString()});

    for (var trait of Traits) {
      var title = trait.Title;
      var collapsedObj = collapsed;
      collapsedObj[title] = true;
      setCollapsed(collapsedObj);
    }

  }, [userTraits]);

  useEffect(() => {
    console.log('hi');
  }, [hack]);

  useEffect(() => {
    console.log(userHeight);
    setInputFeet(userHeight.feet);
    setInputInches(userHeight.inches);
  }, [userHeight]);


  // TODO: input validation, make sure feet & inches are a reasonable num
  // TODO: support entering in cm instead
  // TODO: editing height this way sucks actually
  function handleFeet(text) {
    setInputFeet(text);
  }

  function handleInches(text) {
    setInputInches(text);
  }

  function updateHeight() {
    setHeightCollapsed(true);

    setUserHeight({feet: inputFeet, inches: inputInches});
    onChangeTrait("Height", (parseInt(inputFeet) * 12) + parseInt(inputInches));
  }

  function cancelHeight() {
    setHeightCollapsed(true);

    setInputFeet(userHeight.feet);
    setInputInches(userHeight.inches);
  }

  function toggleCollapsed(title: string) {
    console.log(title);
    console.log(collapsed[title]);
    var collapsedObj = collapsed;
    collapsedObj[title] = !collapsedObj[title];
    setCollapsed(collapsedObj);
    setHack(!hack);
  }

  return (
    <Fragment>
      <Text>{userTraits.SK}</Text>
      {Traits.map((trait) => (
        <Fragment key={trait.Title}>
          <Text style={styles.title}>{trait.Title}:</Text>
          <View style={styles.buttons}>
            <TraitButton title="Clear Trait" selected={false} onPress={() => onClear(trait.Title)}/>
            <View style={styles.buttonContainer}>
              {trait.Options.map((option) => (
                <TraitButton key={option.Desc} title={option.Desc} selected={userTraits[trait.Title].includes(option.Num)} onPress={() => onChangeTrait(trait.Title, option.Num)}/>
              ))}
            </View>
            <TraitButton title="  ?  " selected={!collapsed[trait.Title]} onPress={() => {toggleCollapsed(trait.Title)}} />
          </View>
          { !collapsed[trait.Title] &&
            <View>
              <Text>{trait.Help}</Text>
            </View>
          }
        </Fragment>
      ))}
      {heightCollapsed && 
        <Text>
          <Text style={styles.title}>Height:</Text>
          <Text>{userHeight.feet}' {userHeight.inches}"</Text>
          <TraitButton title="Update Height" selected={!heightCollapsed} onPress={() => {setHeightCollapsed(false)}}/>
        </Text>
      }
      {!heightCollapsed && 
      <Text>
        Feet: <TextInput keyboardType="numeric" value={inputFeet} onChangeText={handleFeet} />
        Inches: <TextInput keyboardType="numeric" value={inputInches} onChangeText={handleInches} />
        <TraitButton title="Update" selected={false} onPress={updateHeight}/> <TraitButton title="Cancel" selected={false} onPress={cancelHeight}/>
      </Text>
      }
    </Fragment>
  );
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 1,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '80%',
    paddingRight: 15,
    paddingLeft: 15,
  },
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
  title: {
    paddingTop: 25,
    paddingBottom: 15,
    fontSize: 24,
    color: 'rgba(0,0,0,0.6)',
  },
});
