import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// icons
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';

// constants
import {COLORS, FONTS} from '../constants';

// components
import BottomLine from '../components/BottomLine.js';
import PostCard from '../components/PostCard.js';
import DeleteModal from '../components/DeleteModal.js';

const size = Dimensions.get('window').width;

const UserProfileScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [cover, setCover] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [uid, setUid] = React.useState(null);
  const [allPost, setAllPost] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [pid, setPid] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const delete_api = () => {
    setDeleteModal(!setDeleteModal);
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/post', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({pid}),
        })
          .then(res => {
            if (res.status === 200)
              setAllPost(allPost.filter(item => item._id != pid));
            else if (res.status === 401) {
              alert('Unauthorized user! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert("Can't find the post!");
              setAllPost(allPost.filter(item => item._id != pid));
            } else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => props.navigation.navigate('warning', {status: 3}));
      })
      .catch(() => {
        alert('Unauthorized user! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const PostCardWrapper = ({item}) => {
    return (
      <PostCard
        own={props.route.params ? false : true}
        pid={item._id}
        profile={image}
        image={item.photo}
        user={name}
        caps={item.caption}
        love={item.loves}
        share={item.shares}
        uid={uid}
        delete_post={() => {
          if (props.route.params) return;
          setPid(item._id);
          setDeleteModal(!deleteModal);
        }}
        hide_buttons={props.route.params ? true : false}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        var tmp_url = '/profile';
        var post_url = '/post';
        if (props.route.params) {
          tmp_url +=
            '/view?' + new URLSearchParams({uid: props.route.params.uid});
          post_url +=
            '/view?' + new URLSearchParams({uid: props.route.params.uid});
        }
        fetch(base_url + tmp_url, {
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
                  setEmail(json.email);
                  setAddress(json.address);
                  setCover(json.cover);
                  setImage(json.image);
                  setUid(json.uid);
                })
                .catch(() => {
                  props.navigation.navigate('warning', {status: 3});
                });
            } else if (res.status === 401) {
              alert('Unauthorized user! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert('User not found!');
              props.navigation.goBack();
            } else if (res.status === 405) {
              alert('Your are not allowed to view this profile!');
              props.navigation.goBack();
            } else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
        fetch(base_url + post_url, {
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllPost(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => props.navigation.navigate('warning', {status: 3}));
      })
      .catch(() => {
        alert('Unauthorized user! Please login now.');
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: COLORS.white}}
        data={allPost}
        renderItem={PostCardWrapper}
        keyExtractor={item => item._id || item.pid}
        ListHeaderComponent={
          <>
            <Image
              style={style.cover}
              source={
                cover
                  ? {uri: base_url + '/cover/' + uid + '.jpg?' + new Date()}
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
                      ? {
                          uri:
                            base_url + '/profile/' + uid + '.jpg?' + new Date(),
                        }
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
            </View>
            <View style={style.buttonContainer}>
              <TouchableOpacity style={style.button}>
                <IconF name="user-minus" style={style.icon} />
                <Text style={style.buttonText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.button}>
                <IconF name="message-square" style={style.icon} />
                <Text style={style.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
            <BottomLine />
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(!reload)}
          />
        }
      />
      <DeleteModal
        visible={deleteModal}
        delete={delete_api}
        info="Do you really want to delete this post?"
        cancel={() => setDeleteModal(!deleteModal)}
      />
    </SafeAreaView>
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
