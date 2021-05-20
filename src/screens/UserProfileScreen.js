import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

const size = Dimensions.get('window').width;

const UserProfileScreen = props => {
  return (
    <View>
      <Image style={style.cover} source={{uri: 'https://picsum.photos/680'}} />
      <View style={style.layout}>
        <Text style={style.bio}>
          This is a sample long bio for testing. This is a sample long bio for
          testing. This is a sample long bio for testing.
        </Text>
        <View style={style.border}>
          <Image
            style={style.profile}
            source={{uri: 'https://picsum.photos/256'}}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cover: {width: '100%', height: 200},
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: COLORS.primary,
    borderWidth: 3,
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
    marginRight: 50,
  },
  profile: {
    width: 148,
    height: 148,
    borderRadius: 74,
  },
  bio: {
    width: size - 210,
    marginLeft: 30,
  },
});

export default UserProfileScreen;
