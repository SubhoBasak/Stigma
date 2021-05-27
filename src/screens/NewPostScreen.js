import React from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf';

// constants
import {COLORS, FONTS} from '../constants';

// components
import PushButton from '../components/PushButton.js';
import LoadingIndicator from '../components/LoadingIndicator.js';

const NewPostScreen = props => {
  const [image, setImage] = React.useState(null);
  const [caption, setCaption] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const select_image = () => {
    ImagePicker.openPicker({
      width: 640,
      height: 480,
      cropping: true,
      borderRadius: 150,
    })
      .then(image => {
        setImage(image);
      })
      .catch(error => {});
  };

  const post_api = () => {
    AsyncStorage.getItem('@token')
      .then(token => {
        var form = new FormData();
        form.append('image', {
          uri: image.path,
          name: 'photo.jpg',
          type: image.mime,
        });
        form.append('caption', caption);

        fetch(base_url + '/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          body: form,
        })
          .then(res => {
            if (res.status === 200) {
              setImage(null);
              setCaption('');
              props.navigation.navigate('home');
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else {
              props.navigation.navigate('warning', {status: 3});
            }
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(error => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  return (
    <>
      <ScrollView
        style={style.container}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setImage(null);
              setCaption('');
            }}
          />
        }>
        <TouchableOpacity onPress={select_image}>
          <Image
            style={style.image}
            source={
              image
                ? {uri: image.path}
                : require('../Assets/Images/gallery.png')
            }
          />
        </TouchableOpacity>
        <View style={style.compose}>
          <TextInput
            multiline={true}
            style={style.input}
            value={caption}
            onChangeText={text => setCaption(text)}
            placeholder="Image caption..."
          />
          <PushButton text="Post" onPress={post_api} />
        </View>
      </ScrollView>
      <LoadingIndicator show={loading} />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  compose: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: COLORS.slate_1,
  },
  input: {
    width: '95%',
    minWidth: '95%',
    minHeight: 100,
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
});

export default NewPostScreen;
