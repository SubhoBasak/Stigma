import React from 'react';
import {ScrollView, StyleSheet, View, Image, Dimensions} from 'react-native';
import {COLORS} from '../constants';

const size = Math.floor(Dimensions.get('window').width / 3) - 2;

const PhotosScreen = props => {
  const all_photos = [
    <Image
      key="img-0"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-1"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-2"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-3"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-4"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-5"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-6"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-7"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-8"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
    <Image
      key="img-9"
      source={{uri: 'https://picsum.photos/256'}}
      style={style.image}
    />,
  ];

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
        height: '100%',
        width: '100%',
      }}>
      <View style={style.layout}>{all_photos}</View>
      <View style={{height: 200}} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: size,
    height: size,
    backgroundColor: 'red',
    marginTop: 2,
  },
});

export default PhotosScreen;
