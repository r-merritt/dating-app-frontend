import React, { Fragment } from 'react';
import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { AuthContext } from '../App';

import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { useFocusEffect } from '@react-navigation/native';

import { Auth as AmplifyAuth } from 'aws-amplify';

import Input from './components/Input';
import ActionButton from './components/ActionButton';
import TraitsList from './components/TraitsList';
import Image from './components/Image';
import { PulseLoader } from 'react-spinners';
import PreferencesList from './components/PreferencesList';

export default function UpdateProfile({navigation, newUser}: {navigation: any, newUser: boolean}) {
  // TODO: add multiple photo upload

  const [age, setAge] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [pronouns, setPronouns] = useState<string>('');
  const [location, setLocation] = useState({ Lat: null, Long: null });
  const [loading, setLoading] = useState<boolean>(false);

  const [locationOption, setLocationOption] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>('');
  const [photos, setPhotos] = useState<Array<string>>();

  const [userTraits, setUserTraits] = useState();

  const [userPreferences, setUserPreferences] = useState();

  const [settingsView, setSettingsView] = useState('Profile');

  const [reRenderHack, setReRenderHack] = useState(1);

  const [collapsed, setCollapsed] = React.useState(true);

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setPreview(result.assets[0].uri);
    var img = await fetchImage(result.assets[0].uri);
    setSelectedFile(img);
  }
};

const fetchImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

  const handleLoadingChange = () => {
    setLoading(!loading);
  };

  const username = useContext(AuthContext);

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

    function onChangeText(type : string, text : string) {
      switch(type) {
        case 'age':
          setAge(text);
          break;
        case 'name':
          setName(text);
          break;
        case 'pronouns':
          setPronouns(text);
          break;  
      }
    }

    async function updateProfile() {
      if (age || name || pronouns || location.Lat) {
        updateInfo();
      }
      if (selectedFile) {
        updatePhoto();
      }
    }

    async function updateInfo() {
      console.log('update profile', age, name, pronouns);
      try {
        var body = { username: username, age: age, name: name, pronouns: pronouns, location: {}};
        if (location.Lat) {
          body.location = location;
        }
        var request = new Request("http://localhost:3000/updateprofile", {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
        },
        });
        await fetch(request);
        console.log('updated profile');
      } catch (err) {
        console.log('error updating profile', err);
      }
    }

    async function updateTraits() {
      console.log('update traits', userTraits);
      try {
        var body = { traits: userTraits };
        var request = new Request("http://localhost:3000/updateusertraits", {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
        },
        });
        await fetch(request);
        console.log('updated traits');
      } catch (err) {
        console.log('error updating traits', err);
      }
    }

    async function updatePreferences() {
      console.log('update preferences', userPreferences);
      try {
        var body = { preferences: userPreferences };
        var request = new Request("http://localhost:3000/updateuserpreferences", {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
        },
        });
        await fetch(request);
        console.log('updated preferences');
      } catch (err) {
        console.log('error updating preferences', err);
      }
    }

    async function getPhotos() {
      try {
        fetch(`http://localhost:3000/getphotos?user=${username}`)
        .then((result) => {return result.json();})
        .then((data) => setPhotos(data.Item.Photos));
        console.log('got photos');
      } catch (err) {
        console.log('error getting photos', err);
      }
    }

    async function updatePhoto() {
      try {
        var request = new Request(`http://localhost:3000/uploadimage/${username}`, {
          method: "post",
          headers: { "Content-Type": "image/jpeg" },
          body: selectedFile,
        });
        // console.log(request.body);
        fetch(request)
        .then((result) => {return result.json();})
        .then((data) => setPhotos(data.result));
        console.log('updated photo');
      } catch (err) {
        console.log('error updating photo', err);
      }
    }


    // TODO: implement approximate location selection
    // TODO: add loading timeout
    useEffect(() => {
      if (locationOption == 'precise') {
        if ("geolocation" in navigator) {
          setLoading(true);
          navigator.geolocation.getCurrentPosition(function (position) {
            setLocation({
              Lat: position.coords.latitude,
              Long: position.coords.longitude,
            });
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
      } else if (locationOption == 'none') {
        setLocation({ Lat: null, Long: null });
        setLoading(false);
      }
    }, [locationOption]);

    useEffect(() => {
      if (loading) {
        if (location.Lat) {
          setLoading(false);
        }
      }
    }, [loading, location]);

    // Get user traits
    useEffect(() => {
      fetch(`http://localhost:3000/getusertraits?user=${username}`)
      .then((result) => {return result.json();})
      .then((data) => {
        console.log(data.Item);
        setUserTraits(data.Item);
      })
      .catch((error) => {console.log(error.message);});
    }, [username]);

    // Get user preferences
    useEffect(() => {
      fetch(`http://localhost:3000/getuserpreferences?user=${username}`)
      .then((result) => {return result.json();})
      .then((data) => {
        console.log(data.Item);
        setUserPreferences(data.Item);
      })
      .catch((error) => {console.log(error.message);});
    }, [username]);

    function checkLocation() {
      console.log(location);
    }

    function onClearTrait(trait) {
      console.log('clearing ', trait);
      console.log(userTraits);

      var traits = userTraits[trait];

      traits.length = 0;

      setUserTraits({...userTraits, trait: traits});
    }

    function onClearPreference(preference) {
      console.log('clearing ', preference);
      console.log(userPreferences);

      var preferences = {Preferred: ["999"], Acceptable: ["999"]};

      var currentPref = userPreferences;
      currentPref[preference] = preferences;

      setReRenderHack(reRenderHack + 1);

      setUserPreferences(currentPref);
    }

    function onChangeTrait(trait, value) {
      console.log('selected ', value, ' on ', trait);

      if (trait == "Height") {
        setUserTraits({...userTraits, Height: value});
        return;
      }

      var traits = userTraits[trait];

      if (traits.includes(value)) {
        var index = traits.indexOf(value);
        traits.splice(index, 1);
      } else {
        traits.push(value);
      }

      setUserTraits({...userTraits, trait: traits});
    }

    // TODO: if all preferences are acceptable/preferred set value to 999
    function onChangePreference(preference, type, value) {
      console.log('selected ', value, ' on ', preference, ' type ', type);
      console.log(userPreferences);

      var currentPreferences = userPreferences;
      var preferenceList = currentPreferences[preference][type];

      if (preferenceList.includes(value)) {
        var index = preferenceList.indexOf(value);
        preferenceList.splice(index, 1);
      } else {
        preferenceList.push(value);
      }
    
      setReRenderHack(reRenderHack + 1);

      currentPreferences[preference][type] = preferenceList;

      setUserPreferences(currentPreferences);
    }

    const radioButtons = [
      {
          id: 'precise',
          label: 'Update precise location',
          value: 'preciselocation',
      },
      {
          id: 'approximate',
          label: 'Pick approximate location',
          value: 'approximatelocation',
      },
      {
          id: 'none',
          label: 'Do not update location',
          value: 'none',
      },
    ];

  return (
    <View style={styles.container}>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <ActionButton
              title='Profile Information'
              onPress={() => setSettingsView('Profile')}
            />
          </View>
          <View style={styles.button}>
            <ActionButton
              title='User Traits'
              onPress={() => setSettingsView('Traits')}
            />
          </View>
          <View style={styles.button}>
            <ActionButton
              title='User Preferences'
              onPress={() => setSettingsView('Preferences')}
            />
          </View>
        </View>

        { settingsView == 'Profile' && (
          <Fragment>
          <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
              {selectedFile && <Image url={preview} photolist={photos} username={username} />}
          </View>
            <Input
              placeholder='Name'
              type='name'
              onChangeText={onChangeText}
            />
            <Input
              placeholder='Age'
              type='age'
              onChangeText={onChangeText}
            />
            <Input
              placeholder='Pronouns'
              type='pronouns'
              onChangeText={onChangeText}
            />
            <Text>
              Loading?
              <Checkbox value={loading} onValueChange={handleLoadingChange} />
            </Text>
            <View>
              <RadioGroup 
                radioButtons={radioButtons} 
                onPress={setLocationOption}
                selectedId={locationOption}
              />
            </View>
            {!loading && (
              <ActionButton
                title='Update Profile'
                onPress={updateProfile}
              />
            )}
            {loading && (
            <PulseLoader
              color={'#ffb100'}
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            )}
          <Text onPress={getPhotos} style={styles.link}>Get Photos</Text>
          <Text onPress={checkLocation} style={styles.link}>Check Location</Text>
        </Fragment>
        )}
        { settingsView == 'Traits' && userTraits && (
          <Fragment>
            <TraitsList userTraits={userTraits} onChangeTrait={onChangeTrait} onClear={onClearTrait} />
            <ActionButton
              title='Update Traits'
              onPress={updateTraits}
            />
          </Fragment>
        )}
        { settingsView == 'Preferences' && userPreferences && ( 
          <Fragment>
            <PreferencesList userPreferences={userPreferences} onChangePreference={onChangePreference} onClear={onClearPreference} hack={reRenderHack}/>
            <ActionButton
              title='Update Preferences'
              onPress={updatePreferences}
            />
          </Fragment>
        )}

        <Text onPress={goToNavList} style={styles.link}>Nav List</Text>

        {photos && (
          <ScrollView>
            <View style={styles.imageContainer}>
          {photos.map(function(photo, key){
              return <Image url={photo} photolist={photos} username={username} key={key}/>;
          })}
          </View>
          </ScrollView>
        )
        }
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 0.5,
  },
  buttons: {
    flexDirection: 'row',
    padding: 1,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    maxHeight: '100%',
    overflow: 'auto',
  },
  link: {
    color: 'blue',
    marginVertical: 5
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    maxWidth: 200,
    padding: 15,
  },
  list: {
    maxHeight: '100%',
  },
});
