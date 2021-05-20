import React from 'react';
import {ScrollView, View} from 'react-native';

// components
import InfoCard from '../components/InfoCard.js';
import {COLORS} from '../constants/index.js';

const AlbumScreen = props => {
  const all_albums = [
    <InfoCard
      image="https://picsum.photos/128"
      title="Album Name"
      card_press={() => props.navigation.navigate('photos')}
    />,
    <InfoCard
      image="https://picsum.photos/128"
      title="Album Name"
      card_press={() => props.navigation.navigate('photos')}
    />,
    <InfoCard
      image="https://picsum.photos/128"
      title="Album Name"
      card_press={() => props.navigation.navigate('photos')}
    />,
  ];

  return (
    <ScrollView style={{height: '100%', backgroundColor: COLORS.white}}>
      {all_albums}
      <View style={{height: 150}} />
    </ScrollView>
  );
};

export default AlbumScreen;
