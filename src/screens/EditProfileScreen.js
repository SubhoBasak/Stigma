import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import InputBox from '../components/InputBox.js';
import PushButton from '../components/PushButton.js';
import LoadingIndicator from '../components/LoadingIndicator.js';
import {add, set} from 'react-native-reanimated';

const EditScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState('');
  const [cover, setCover] = React.useState('');
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [uid, setUid] = React.useState(null);

  const change_profile_pic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      borderRadius: 150,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {});
  };

  const change_cover_pic = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
    })
      .then(image => {
        setCover(image.path);
      })
      .catch(error => {});
  };

  const update_api = () => {
    AsyncStorage.getItem('@token')
      .then(token => {
        var form = new FormData();
        form.append('name', name.trim());
        form.append('bio', bio.trim());
        form.append('address', address.trim());

        fetch(base_url + '/profile', {
          method: 'PUT',
          headers: {Authorization: token},
          body: form,
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              props.navigation.navigate('profile');
            } else {
              props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(error => {
            props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(error => {
        alert('Unauthorized user! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/profile', {
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              res
                .json()
                .then(json => {
                  setName(json.name);
                  setBio(json.bio);
                  setAddress(json.address);
                  setImage(json.image);
                  setCover(json.cover);
                  setUid(json.uid);
                })
                .catch(error => {
                  props.navigation.navigate('warning', {status: 3});
                });
            } else {
              props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(error => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(error => {
        alert('Unauthorized user! Please login now.');
        props.navigation.navigate('auth');
      });
  }, []);

  return (
    <>
      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: COLORS.white}}>
        <View style={style.canvas}>
          <TouchableOpacity style={style.cover} onPress={change_cover_pic}>
            <Image
              style={style.cover}
              source={
                cover
                  ? {uri: base_url + '/cover/' + uid + '.jpg'}
                  : require('../Assets/Images/cover.jpg')
              }
            />
          </TouchableOpacity>
          <View style={style.border}>
            <TouchableOpacity onPress={change_profile_pic}>
              <Image
                style={style.profile}
                source={
                  image
                    ? {uri: base_url + '/profile/' + uid + '.jpg'}
                    : require('../Assets/Images/photo.png')
                }
              />
            </TouchableOpacity>
          </View>
          <InputBox
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <InputBox
            placeholder="Bio"
            onChangeText={text => setBio(text)}
            value={bio}
          />
          <InputBox
            placeholder="Address"
            onChangeText={text => setAddress(text)}
            value={address}
          />
          <PushButton text="Update" onPress={update_api} />
        </View>
      </ScrollView>
      <LoadingIndicator show={loading} />
    </>
  );
};

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  cover: {width: '100%', height: 200},
  border: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: COLORS.primary,
    borderWidth: 3,
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
    marginBottom: 20,
  },
  profile: {
    width: 148,
    height: 148,
    borderRadius: 74,
  },
  icon: {
    color: COLORS.primary,
    fontSize: 22,
    marginHorizontal: 6,
  },
});

export default EditScreen;
