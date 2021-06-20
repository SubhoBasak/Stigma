import React from 'react';
import {View, ScrollView} from 'react-native';

// constants
import {COLORS} from '../constants/index.js';

// components
import SearchBar from '../components/SearchBar.js';
import InfoCard from '../components/InfoCard.js';

const AllMessageScreen = props => {
  const all_messages = [
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-0"
      badge="100"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-1"
      badge="99"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-2"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-3"
      badge="97"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-4"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-5"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-6"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-7"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-8"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-9"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
    <InfoCard
      card_press={() => props.navigation.navigate('message')}
      key="msg-91"
      image="https://picsum.photos/128"
      title="User Name"
      body="This is the last message"
    />,
  ];

  return (
    <View style={{backgroundColor: COLORS.white}}>
      <SearchBar />
      <ScrollView>
        <View>
          {all_messages}
          <View style={{height: 200}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AllMessageScreen;
