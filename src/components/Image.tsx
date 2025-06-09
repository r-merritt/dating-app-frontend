import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function Image({url, username, photolist} : {url: string, username: string, photolist: Array<string>}) {

  async function onSetProfilePic() {
    console.log('set profile pic', url);
    try {
      var request = new Request("http://localhost:3000/setprofilepic", {
        method: "post",
        body: JSON.stringify({username: username, photo: url}),
        headers: {
          'Content-Type': 'application/json',
      },});
      // console.log(request.body);
      fetch(request);
      console.log('set profile pic');
    } catch (err) {
      console.log('error updating profile pic', err);
    }
  }

  // TODO: Handle deleting profile photo
  async function onDeletePhoto() {
    console.log('delete photo', url);
    try {
      var index = photolist.indexOf(url);
      console.log(index);
      var request = new Request("http://localhost:3000/deletephoto", {
        method: "post",
        body: JSON.stringify({username: username, photoIndex: index, url: url}),
        headers: {
          'Content-Type': 'application/json',
      },});
      // console.log(request.body);
      fetch(request);
      console.log('deleted photo');
    } catch (err) {
      console.log('error deleting photo', err);
    }
  }

  return (
    <View>
      <img src={url} style={styles.image} />
      <Button
        onPress={onSetProfilePic}
        title="Set as Profile Pic"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={onDeletePhoto}
        title="Delete Photo"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  image: {
    maxWidth: 200,
    padding: 15,
  },
});