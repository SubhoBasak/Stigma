import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// icons
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';
import IconAD from 'react-native-vector-icons/AntDesign';

// constants
import {COLORS, FONTS} from '../constants';
import PostCard from '../components/PostCard';
import BottomLine from '../components/BottomLine';

// components
import LoadingIndicator from '../components/LoadingIndicator.js';

const size = Dimensions.get('window').width;

const UserProfileScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState(null);
  const [cover, setCover] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [uid, setUid] = React.useState(null);

  const all_post = [
    <PostCard
      key="post-card-0"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only. This is a long long long post caption for testing purpose only. This is a long long long post caption for testing purpose only. This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
      loved={true}
    />,
    <PostCard
      key="post-card-1"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
    />,
    <PostCard
      key="post-card-2"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
    />,
  ];

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/profile', {
          headers: {'Content-Type': 'application/json', Authorization: token},
        }).then(res => {
          setLoading(false);
          if (res.status === 200) {
            res
              .json()
              .then(json => {
                setName(json.name);
                setBio(json.bio);
                setEmail(json.email);
                setAddress(json.address);
                setCover(json.cover);
                setImage(json.image);
                setUid(json.uid);
              })
              .catch(error => {
                props.navigation.navigate('warning', {status: 3});
              });
          } else if (res.status === 401) {
            AsyncStorage.clear();
            alert('Unauthorized user! Please login now.');
            props.navigation.navigate('auth');
          } else {
          }
        });
      })
      .catch(error => {
        setLoading(false);
        AsyncStorage.clear();
        alert('Unauthorized user! Please login now.');
        props.navigation.navigate('auth');
      });
  }, []);

  return (
    <>
      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: COLORS.white}}>
        <View style={{width: '100%', height: '100%'}}>
          <Image
            style={style.cover}
            source={
              cover
                ? {uri: base_url + '/cover/' + uid + '.jpg'}
                : require('../Assets/Images/cover.jpg')
            }
          />
          <View style={style.layout}>
            <Text style={style.bio}>{bio}</Text>
            <View style={style.border}>
              <Image
                style={style.profile}
                source={
                  image
                    ? {uri: base_url + '/profile/' + uid + '.jpg'}
                    : require('../Assets/Images/photo.png')
                }
              />
            </View>
          </View>
          <Text style={style.userName}>{name}</Text>
          <View style={style.mainInfoContainer}>
            <View style={style.mainInfo}>
              <IconMI style={style.icon} name="alternate-email" />
              <Text style={style.mainInfoText}>{email}</Text>
            </View>
            <View style={style.mainInfo}>
              <IconF style={style.icon} name="home" />
              <Text style={style.mainInfoText}>{address}</Text>
            </View>
            <View style={style.mainInfo}>
              <IconAD style={style.icon} name="calendar" />
              <Text style={style.mainInfoText}>27 May 2001</Text>
            </View>
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity style={style.button}>
              <IconF name="camera" style={style.icon} />
              <Text style={style.buttonText}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button}>
              <IconF name="message-square" style={style.icon} />
              <Text style={style.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
          <BottomLine />
          <View style={{marginTop: 20}}>{all_post}</View>
        </View>
      </ScrollView>
      <LoadingIndicator show={loading} />
    </>
  );
};

const style = StyleSheet.create({
  cover: {width: '100%', height: 200},
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginRight: 50,
  },
  profile: {
    width: 148,
    height: 148,
    borderRadius: 74,
  },
  bio: {
    width: size - 210,
    marginLeft: 30,
    fontFamily: FONTS.font_light,
    textAlign: 'justify',
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    color: COLORS.primary,
    fontSize: 18,
    marginHorizontal: 6,
  },
  userName: {
    fontFamily: FONTS.font_bold,
    fontSize: 22,
    margin: 10,
  },
  mainInfoContainer: {
    marginVertical: 10,
  },
  mainInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  mainInfoText: {
    fontFamily: FONTS.font_medium,
    fontSize: 17,
    color: COLORS.slate_3,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    height: 40,
    width: 130,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.slate_1,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.slate_2,
  },
});

export default UserProfileScreen;
