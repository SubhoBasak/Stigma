import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

// constants
import {FONTS, COLORS} from '../constants';

const InputBox = props => {
  return (
    <View style={style.input_box}>
      <TextInput
        style={style.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize}
        autoCompleteType={props.autoCompleteType}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        value={props.value}
      />
    </View>
  );
};

const style = StyleSheet.create({
  input_box: {
    width: '90%',
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderColor: COLORS.slate_1,
    borderWidth: 1,
    marginBottom: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    fontFamily: FONTS.font_regular,
    fontSize: 20,
    color: COLORS.slate_1,
  },
});

export default InputBox;
