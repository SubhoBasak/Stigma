import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../constants';

const size = Math.floor(Dimensions.get('window').width / 3) - 2;

const PhotosScreen = props => {
  const all_photos = [
    <TouchableOpacity
      key="img-0"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 0})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-1"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 1})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-2"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 2})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-3"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 3})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-4"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 4})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-5"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 5})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-6"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 6})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-7"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 7})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-8"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 8})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
    <TouchableOpacity
      key="img-9"
      onPress={() => props.navigation.navigate('zoom', {init_img_indx: 9})}>
      <Image source={{uri: 'https://picsum.photos/256'}} style={style.image} />
    </TouchableOpacity>,
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
