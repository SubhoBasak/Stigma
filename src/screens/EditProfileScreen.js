import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import InputBox from '../components/InputBox.js';
import PushButton from '../components/PushButton.js';

const EditScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState('');
  const [cover, setCover] = React.useState('');
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [uid, setUid] = React.useState(null);
  const [reload, setReload] = React.useState(false);

  const change_profile_pic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      borderRadius: 150,
    })
      .then(image => {
        AsyncStorage.getItem('@token')
          .then(token => {
            var form = new FormData();
            form.append('image', {
              uri: image.path,
              name: 'photo.jpg',
              type: image.mime,
            });

            fetch(base_url + '/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token,
              },
              body: form,
            })
              .then(res => {
                setLoading(false);
                if (res.status === 200) {
                  setImage(true);
                  setReload(!reload);
                } else if (res.status === 401) {
                  alert('Unauthorized User! Please login now.');
                  AsyncStorage.clear();
                  props.navigation.navigate('auth');
                } else if (res.status === 404) {
                  alert('User not found! Please login again.');
                  AsyncStorage.clear();
                  props.navigation.navigate('auth');
                } else props.navigation.navigate('warning', {status: 1});
              })
              .catch(() => {
                setLoading(false);
                props.navigation.navigate('warning', {status: 3});
              });
            setLoading(true);
          })
          .catch(() => {
            alert('Unauthorized User! Please login now.');
            props.navigation.navigate('auth');
          });
      })
      .catch(() => {});
  };

  const change_cover_pic = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
    })
      .then(image => {
        AsyncStorage.getItem('@token')
          .then(token => {
            var form = new FormData();
            form.append('cover', {
              uri: image.path,
              name: 'photo.jpg',
              type: image.mime,
            });

            fetch(base_url + '/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token,
              },
              body: form,
            })
              .then(res => {
                setLoading(false);
                if (res.status === 200) {
                  setCover(true);
                  setReload(!reload);
                } else if (res.status === 401) {
                  alert('Unauthorized User! Please login now.');
                  AsyncStorage.clear();
                  props.navigation.navigate('auth');
                } else if (res.status === 404) {
                  alert('User not found! Please login again.');
                  AsyncStorage.clear();
                  props.navigation.navigate('auth');
                } else props.navigation.navigate('warning', {status: 1});
              })
              .catch(() => {
                setLoading(false);
                props.navigation.navigate('warning', {status: 3});
              });
            setLoading(true);
          })
          .catch(() => {
            alert('Unauthorized User! Please login now.');
            props.navigation.navigate('auth');
          });
      })
      .catch(() => {});
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
            if (res.status === 200) props.navigation.navigate('profile');
            else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(() => {
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
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(() => {
        alert('Unauthorized user! Please login now.');
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <>
      <ScrollView
        style={{backgroundColor: COLORS.white}}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(!reload)}
          />
        }>
        <View style={style.canvas}>
          <TouchableOpacity style={style.cover} onPress={change_cover_pic}>
            <Image
              style={style.cover}
              source={
                cover
                  ? {uri: base_url + '/cover/' + uid + '.jpg?' + new Date()}
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
                    ? {uri: base_url + '/profile/' + uid + '.jpg?' + new Date()}
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
