import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

// constants
import {COLORS} from '../constants';

// components
import Compose from '../components/Compose.js';
import InfoCard from '../components/InfoCard.js';
import MessageCard from '../components/MessageCard.js';
import {base_url} from '../../conf';

const MessageScreen = props => {
  const [image, setImage] = React.useState(null);

  return (
    <View style={style.canvas}>
      <View style={style.header}>
        <InfoCard title="User Name" body="Online" />
      </View>
      <ScrollView>
        <MessageCard message="This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. " />
        <MessageCard send={true} message="This is a small message." />
        <MessageCard
          send={true}
          message="This is a test message. This is a test message. This is a test message. This is a test message. This is a test message."
        />
        <MessageCard message="This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. " />
        <MessageCard send={false} message="This is a small message." />
        <MessageCard
          send={true}
          message="This is a test message. This is a test message. This is a test message. This is a test message. This is a test message."
        />
      </ScrollView>
      <Compose placeholder="Enter your message..." />
    </View>
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
