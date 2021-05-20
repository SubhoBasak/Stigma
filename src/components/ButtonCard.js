import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

// components
import InfoCard from './InfoCard.js';

const ButtonCard = props => {
  const button1 = () => {
    if (props.button1) {
      return (
        <TouchableOpacity style={style.button} onPress={props.onPress1}>
          <Text style={style.text}>{props.button1}</Text>
        </TouchableOpacity>
      );
    }
    return <></>;
  };

  const button2 = () => {
    if (props.button2) {
      return (
        <TouchableOpacity style={style.button} onPress={props.onPress2}>
          <Text style={style.text}>{props.button2}</Text>
        </TouchableOpacity>
      );
    }
    return <></>;
  };

  return (
    <View>
      <InfoCard image={props.image} title={props.title} body={props.body} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 5,
        }}>
        {button1()}
        {button2()}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    width: '28%',
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate_1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  text: {
    color: COLORS.primary,
    fontFamily: FONTS.font_light,
    fontSize: 18,
  },
});

export default ButtonCard;
