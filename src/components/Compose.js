import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

// icons
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

// constants
import {COLORS, FONTS} from '../constants';

const Compose = props => {
  return (
    <View style={style.comment_container}>
      <View style={style.comment}>
        <TextInput
          style={style.text_input}
          value={props.value}
          multiline={true}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
        />
        <TouchableOpacity onPress={props.send}>
          <IconSLI style={style.send_icon} name="arrow-up-circle" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  comment_container: {
    width: '100%',
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    width: '95%',
    height: 48,
    borderRadius: 27,
    borderColor: COLORS.primary,
    borderWidth: 2,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_input: {
    fontFamily: FONTS.font_regular,
    fontSize: 17,
    width: '90%',
  },
  send_icon: {
    width: 24,
    height: 24,
    fontSize: 24,
    minWidth: 24,
    minHeight: 24,
    maxWidth: 24,
    maxHeight: 24,
    color: COLORS.primary,
  },
});

export default Compose;
