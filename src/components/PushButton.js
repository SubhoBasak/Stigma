import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

const PushButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={style.button}>
      <Text style={style.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: 131,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowColor: '#000000',
    shadowRadius: 0,
    elevation: 4,
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 20,
    color: COLORS.white,
  },
});

export default PushButton;
