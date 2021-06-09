import React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import PostCard from '../components/PostCard.js';
import Compose from '../components/Compose.js';
import InfoCard from '../components/InfoCard.js';
import {set} from 'react-native-reanimated';

const socket = io(base_url + '/comment');

const CommentScreen = props => {
  const [uid, setUid] = React.useState(null);
  const [name, setName] = React.useState('');
  const [profile, setProfile] = React.useState(false);
  const [caption, setCaption] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [love, setLove] = React.useState(0);
  const [share, setShare] = React.useState(0);
  const [loved, setLoved] = React.useState(false);
  const [allComments, setAllComments] = React.useState([]);
  const [comment, setComment] = React.useState('');

  socket.connect();

  const comment_now = () => {
    AsyncStorage.getItem('@token')
      .then(token => socket.emit('cmnt', {token, comment}))
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const InfoCardWrapper = ({item}) => {
    return (
      <InfoCard
        card_press={() => props.navigation.navigate('profile', {uid: item.uid})}
        title="User Name"
        body="This is a long long long comment for testing. This is a long long long comment for testing."
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        const tmp = props.route.params.own
          ? '/post/details?'
          : '/post/view_details?';
        fetch(
          base_url + tmp + new URLSearchParams({pid: props.route.params.pid}),
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        ).then(res => {
          if (res.status === 200) {
            res
              .json()
              .then(json => {
                setUid(json.uid);
                setName(json.name);
                setProfile(json.profile);
                setPhoto(json.photo);
                setCaption(json.caption);
                setAllComments(json.comment);
                setLove(json.love);
                setLoved(json.loved);
                setShare(json.share);
              })
              .catch(() => props.navigation.navigate('warning', {status: 3}));
          } else if (res.status === 401) {
            alert('Unauthorized User! Please login now.');
            AsyncStorage.clear();
            props.navigation.navigate('auth');
          } else if (res.status === 404) {
            alert('Post not found!');
            props.navigation.goBack();
          } else if (res.status === 500)
            props.navigation.navigate('warning', {stauts: 1});
        });
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  }, []);

  return (
    <SafeAreaView style={style.canvas}>
      <FlatList
        data={allComments}
        renderItem={InfoCardWrapper}
        ListHeaderComponent={
          <PostCard
            uid={uid}
            user={name}
            profile={profile}
            image={photo}
            caps={caption}
            love={love}
            share={share}
            loved={loved}
            pid={props.route.params.pid}
          />
        }
      />
      <Compose
        placeholder="Enter your comment here..."
        onChangeText={text => setComment(text)}
        send={comment_now}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  canvas: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
});

export default CommentScreen;
