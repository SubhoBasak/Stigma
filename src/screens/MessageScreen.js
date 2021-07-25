import React from 'react';
import {SafeAreaView, FlatList, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';

// constants
import {COLORS} from '../constants';

// components
import Compose from '../components/Compose.js';
import InfoCard from '../components/InfoCard.js';
import MessageCard from '../components/MessageCard.js';
import {base_url} from '../../conf';

const MessageScreen = props => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [allMessage, setAllMessage] = React.useState([]);
  const [msgText, setMsgText] = React.useState('');

  const msgListRef = React.useRef();

  if (!props.route.params.token)
    return props.navigation.navigate('warning', {status: 3});

  const socket = io(base_url + '/message', {
    extraHeaders: {Authorization: props.route.params.token},
  });

  socket.on('all_msg', data => {
    setAllMessage(data);
  });
  socket.on('rcv_msg', data => {
    if (data.sender === props.route.params.uid) {
      allMessage.push({
        _id: new Date().toString(),
        sender: data.sender,
        receiver: 'me',
        message: data.message,
      });
      msgListRef.current.scrollToEnd({
        animated: true,
      });
    }
  });

  const MessageCardWrapper = ({item}) => {
    msgListRef.current.scrollToEnd({
      animated: true,
    });
    if (item.sender === props.route.params.uid) {
      return <MessageCard message={item.message} time={item.createdAt} />;
    } else {
      return <MessageCard message={item.message} time={item.createdAt} send />;
    }
  };

  const snd_msg = () => {
    socket.emit('new_msg', {
      receiver: props.route.params.uid,
      message: msgText,
    });
    allMessage.push({
      _id: new Date().toString(),
      sender: 'me',
      receiver: props.route.params.uid,
      message: msgText,
      createdAt: new Date().toISOString(),
    }),
      setMsgText('');
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(
          base_url +
            '/profile/view/?' +
            new URLSearchParams({uid: props.route.params.uid}),
          {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        )
          .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(json => {
                  setName(json.name);
                  setImage(json.image);
                  setAddress(json.address);
                })
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else if (res.status === 401) {
              alert('You are unauthorized! Please login now.');
              props.navigation.navigate('auth');
            } else if (res.status === 404)
              props.navigation.navigate('warning', {status: 0});
            else if (res.status === 405) {
              alert('Your are not allowed to message this person.');
              props.navigation.goBack();
            } else if (res.status === 500)
              props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => props.navigation.navigate('warning', {status: 3}));
        fetch(
          base_url +
            '/message/?' +
            new URLSearchParams({uid: props.route.params.uid}),
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        )
          .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllMessage(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else if (res.status === 401) {
              alert('You are unauthorized! Please login now.');
              props.navigation.navigate('auth');
            } else if (res.status === 404)
              props.navigation.navigate('warning', {status: 0});
            else if (res.status === 405) {
              alert('Your are not allowed to message this person.');
              props.navigation.goBack();
            } else if (res.status === 500)
              props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => props.navigation.navigate('warning', {status: 3}));
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  }, []);

  return (
    <SafeAreaView style={style.canvas}>
      <View style={style.header}>
        <InfoCard
          image={
            image
              ? base_url + '/profile/' + props.route.params.uid + '.jpg'
              : null
          }
          title={name}
          body={address}
        />
      </View>
      <FlatList
        ref={msgListRef}
        data={allMessage}
        renderItem={MessageCardWrapper}
        keyExtractor={item => item._id}
      />
      <Compose
        placeholder="Enter your message..."
        onChangeText={text => setMsgText(text)}
        value={msgText}
        send={snd_msg}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  img_bg: {
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: COLORS.primary,
  },
});

export default MessageScreen;
