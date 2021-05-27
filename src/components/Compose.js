import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// icons
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

// constants
import {COLORS, FONTS} from '../constants';

const width = (Dimensions.get('screen').width * 95) / 100 - 110;

const Compose = props => {
  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <TouchableOpacity>
          <IconSLI style={style.icon} name="emotsmile" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSLI style={style.icon} name="paper-clip" />
        </TouchableOpacity>
        <TextInput
          style={style.input}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          multiline={true}
        />
        <TouchableOpacity>
          <IconSLI
            style={[style.icon, {color: COLORS.primary}]}
            name="arrow-up-circle"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    minHeight: 64,
    maxHeight: 192,
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gray_3,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 24,
  },
  wrapper: {
    width: '95%',
    height: 'auto',
    minHeight: 42,
    maxHeight: 126,
    maxWidth: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.slate_1,
  },
  icon: {
    width: 24,
    height: 24,
    fontSize: 24,
    minWidth: 24,
    minHeight: 24,
    maxWidth: 24,
    maxHeight: 24,
    color: COLORS.slate_2,
  },
  input: {
    fontFamily: FONTS.font_regular,
    color: COLORS.gray_2,
    width: width,
    maxWidth: width,
    height: 'auto',
    minHeight: 42,
    maxHeight: 126,
  },
});

export default Compose;
