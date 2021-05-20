import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

// icons
import IconEV from 'react-native-vector-icons/EvilIcons';
import {COLORS, FONTS} from '../constants';

const PasswordBox = props => {
  const [show, setShow] = React.useState(false);

  return (
    <View style={style.password_box}>
      <TextInput
        style={style.password_input}
        placeholder={props.placeholder}
        secureTextEntry={!show}
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <IconEV
          color={COLORS.slate_1}
          size={40}
          name={show ? 'lock' : 'unlock'}
          color={COLORS.slate_1}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  password_box: {
    width: '90%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderRadius: 25,
    borderColor: COLORS.slate_1,
    borderWidth: 1,
    marginBottom: 18,
  },
  password_input: {
    flex: 8,
    fontFamily: FONTS.font_regular,
    fontSize: 20,
    color: COLORS.slate_1,
  },
});

export default PasswordBox;
