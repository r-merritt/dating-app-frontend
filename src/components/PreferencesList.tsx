import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import PreferenceButton from './PreferenceButton';
import ActionButton from './ActionButton';


export default function PreferencesList({userPreferences, onChangePreference, onClear, hack}: {userPreferences : any, onChangePreference : Function, onClear : Function, hack : number}) {
  const [collapsed, setCollapsed] = useState(true);
  const [bodyHairCollapsed, setBodyHairCollapsed] = useState(true);
  const [bodyTypeCollapsed, setBodyTypeCollapsed] = useState(true);
  const [bustSizeCollapsed, setBustSizeCollapsed] = useState(true);
  const [faceShapeCollapsed, setFaceShapeCollapsed] = useState(true);
  const [facialHairCollapsed, setFacialHairCollapsed] = useState(true);
  const [muscleToneCollapsed, setMuscleToneCollapsed] = useState(true);
  const [weightCollapsed, setWeightCollapsed] = useState(true);
  const [heightCollapsed, setHeightCollapsed] = useState(true);

  // TODO: un-hack this
  

  // procedurally generate this -- 
  // <PreferenceSet title="None" assignedNumber="1" changePref={onChangePreference} />
  // change collapsed toggles to an object
  // {BodyHair: true, BodyType: false} etc
  
  return (
    <Fragment>
        <Text>{userPreferences.SK}</Text>
        <Text>Body Hair:</Text>
        <View style={styles.buttons}>
            <ActionButton title="Clear Preference" onPress={() => onClear('BodyHair')}/>
            <View style={styles.preferenceSet}>
              <Text>None</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyHair.Acceptable.includes('1')} onPress={() => onChangePreference('BodyHair', 'Acceptable', '1')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyHair.Preferred.includes('1')} onPress={() => onChangePreference('BodyHair', 'Preferred', '1')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Some</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyHair.Acceptable.includes('2')} onPress={() => onChangePreference('BodyHair', 'Acceptable', '2')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyHair.Preferred.includes('2')} onPress={() => onChangePreference('BodyHair', 'Preferred', '2')} />
              </View>
            <View style={styles.preferenceSet}>
              <Text>More</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyHair.Acceptable.includes('3')} onPress={() => onChangePreference('BodyHair', 'Acceptable', '3')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyHair.Preferred.includes('3')} onPress={() => onChangePreference('BodyHair', 'Preferred', '3')} />
              </View>
            <View style={styles.preferenceSet}>
              <Text>A Lot</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyHair.Acceptable.includes('4')} onPress={() => onChangePreference('BodyHair', 'Acceptable', '4')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyHair.Preferred.includes('4')} onPress={() => onChangePreference('BodyHair', 'Preferred', '4')} />
            </View>
            <ActionButton title="  ?  " onPress={() => {setBodyHairCollapsed(!bodyHairCollapsed)}}/>
        </View>
        { !bodyHairCollapsed && 
        <View>
            <Text>None: Body hair is very sparse or often shaved off</Text>
            <Text>Some: Most body hair is sparse or shaved off, but not all</Text>
            <Text>More: Body hair is left where it grows</Text>
            <Text>A Lot: Body hair is left where it grows and there's a lot of it</Text>
        </View>
        }
        <Text>Body Proportions:</Text>
        <View style={styles.buttons}>
            <ActionButton title="Clear Preference" onPress={() => onClear('BodyProportions')}/>
            <View style={styles.preferenceSet}>
              <Text>Rectangle</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('01')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '01')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('01')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '01')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Triangle/Pear</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('02')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '02')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('02')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '02')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Spoon</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('03')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '03')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('03')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '03')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Hourglass</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('04')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '04')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('04')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '04')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Top Hourglass</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('05')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '05')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('05')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '05')} />
            </View>
        </View>
        <View style={styles.buttons}>
            <View style={styles.preferenceSet}>
              <Text>Bottom Hourglass</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('06')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '06')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('06')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '06')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Inverted Triangle/Apple</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('07')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '07')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('07')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '07')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Round</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('08')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '08')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('08')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '08')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Diamond</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('09')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '09')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('09')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '09')} />
            </View>
            <View style={styles.preferenceSet}>
              <Text>Athletic</Text>
              <PreferenceButton type="Acceptable" selected={userPreferences.BodyProportions.Acceptable.includes('10')} onPress={() => onChangePreference('BodyProportions', 'Acceptable', '10')} />
              <PreferenceButton type="Preferred" selected={userPreferences.BodyProportions.Preferred.includes('10')} onPress={() => onChangePreference('BodyProportions', 'Preferred', '10')} />
            </View>
            <ActionButton title="  ?  " onPress={() => {setBodyTypeCollapsed(!bodyTypeCollapsed)}}/>
        </View>
        { !bodyTypeCollapsed && 
        <View>
            <Text>Body Type Help</Text>
        </View>
        }
    </Fragment>
  );
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 1,
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
  preferenceSet: {
    flexDirection: 'column',
  }
});
