import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

const MessageCard = props => {
  return (
    <View style={[style.canvas, props.send ? {alignItems: 'flex-end'} : {}]}>
      <Text>{props.sender}</Text>
      <View
        style={[
          style.card,
          props.send
            ? {backgroundColor: COLORS.slate_1, borderBottomRightRadius: 0}
            : {backgroundColor: COLORS.primary, borderBottomLeftRadius: 0},
        ]}>
        <Text
          style={[
            style.text,
            props.send ? {color: COLORS.gray_3} : {color: COLORS.white},
          ]}>
          {props.message}
        </Text>
      </View>
      <Text>{props.time}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    display: 'flex',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  card: {
    width: '65%',
    maxWidth: '65%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 18,
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 16,
  },
});

export default MessageCard;
