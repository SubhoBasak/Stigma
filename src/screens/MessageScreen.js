import React from 'react';
import {SafeAreaView, FlatList, StyleSheet, View} from 'react-native';

// constants
import {COLORS} from '../constants';

// components
import Compose from '../components/Compose.js';
import InfoCard from '../components/InfoCard.js';
import MessageCard from '../components/MessageCard.js';
import {base_url} from '../../conf';

const MessageScreen = props => {
  const [allMessage, setAllMessage] = React.useState([]);

  // <MessageCard message="This is a test message." />;

  return (
    <SafeAreaView style={style.canvas}>
      <View style={style.header}>
        <InfoCard title="User Name" body="Online" />
      </View>
      <FlatList
        data={allMessage}
        renderItem={MessageCard}
        keyExtractor={item => item._id}
      />
      <Compose placeholder="Enter your message..." />
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
