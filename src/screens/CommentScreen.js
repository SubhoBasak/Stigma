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

  const socket = io(base_url + '/comment', {
    extraHeaders: {Authorization: props.route.params.token},
  });
  socket.connect();
  socket.on('err', data => {
    if (data.status === 401) {
      alert('Unauthorized User! Please login now.');
      props.navigation.navigate('auth');
    } else if (data.status === 404)
      props.navigation.navigate('warning', {status: 0});
    else if (data.status === 405) {
      alert('Your are not allowed to comment on this post!');
      props.navigation.goBack();
    } else props.navigation.navigate('warning', {status: 3});
  });
  socket.on('submit', data => setAllComments(allComments.concat([data])));

  const comment_now = () => {
    socket.emit('comment', {comment, pid: props.route.params.pid});
    setComment('');
  };

  const InfoCardWrapper = ({item}) => {
    return (
      <InfoCard
        card_press={() => props.navigation.navigate('profile', {uid: item.uid})}
        title={item.name}
        image={item.profile ? base_url + '/profile/' + item.uid + '.jpg' : null}
        body={item.comment}
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
        keyExtractor={item => item.cid}
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
        value={comment}
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
