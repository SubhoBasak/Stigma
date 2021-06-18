import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// icons
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

// constants
import {COLORS, FONTS} from '../constants';

// components
import PostCard from '../components/PostCard.js';
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

  const comment_now = () => {
    if (!comment) return;
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/comment/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({pid: props.route.params.pid, comment}),
        }).then(res => {
          if (res.status === 200)
            res.json().then(json => {
              setComment('');
              setAllComments(allComments.concat([json]));
            });
          else if (res.status === 401) {
            alert('Unauthorized User! Please login now.');
            AsyncStorage.clear();
            props.navigation.navigate('auth');
          } else if (res.status === 404)
            props.navigation.navigate('warning', {status: 0});
          else if (res.status === 405) {
            alert('You are not allowed to comment on this post!');
            props.navigation.goBack();
          } else props.navigation.navigate('warning', {status: 1});
        });
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const InfoCardWrapper = ({item}) => {
    return (
      <InfoCard
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
      <View style={style.comment_container}>
        <View style={style.comment}>
          <TextInput
            style={style.text_input}
            value={comment}
            multiline={true}
            onChangeText={text => setComment(text)}
            placeholder="Enter your comment here..."
          />
          <TouchableOpacity onPress={comment_now}>
            <IconSLI style={style.send_icon} name="arrow-up-circle" />
          </TouchableOpacity>
        </View>
      </View>
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
  comment_container: {
    width: '100%',
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    width: '95%',
    height: 48,
    borderRadius: 27,
    borderColor: COLORS.primary,
    borderWidth: 2,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_input: {
    fontFamily: FONTS.font_regular,
    fontSize: 17,
    width: '90%',
  },
  send_icon: {
    width: 24,
    height: 24,
    fontSize: 24,
    minWidth: 24,
    minHeight: 24,
    maxWidth: 24,
    maxHeight: 24,
    color: COLORS.primary,
  },
});

export default CommentScreen;
