import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

const WarningScreen = props => {
  var image, text;

  if (props.route.params.status === 0) {
    image = require('../Assets/Images/not_found.png');
    text = "Can't find anything!";
  } else if (props.route.params.status === 1) {
    image = require('../Assets/Images/server_error.png');
    text = 'Server Error! Please try again later.';
  } else if (props.route.params.status === 2) {
    image = require('../Assets/Images/time_out.png');
    text = 'Connection Timeout!\nPlease try again.';
  } else {
    image = require('../Assets/Images/bug.png');
    text = 'Something went worng!\nPlease try again.';
  }

  return (
    <View style={style.canvas}>
      <Image style={style.image} source={image} />
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: 240,
    height: 240,
    maxHeight: 240,
    maxWidth: 240,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.font_medium,
    color: COLORS.gray_2,
    textAlign: 'center',
  },
});

export default WarningScreen;
