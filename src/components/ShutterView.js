import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

// constants
import {COLORS} from '../constants';

const ShutterView = props => {
  return (
    <View style={style.bg}>
      <View style={style.shutter}>
        <Image
          source={require('../Assets/Images/logo.png')}
          style={style.logo}
        />
        {props.children}
      </View>
      <View style={style.footer}>{props.footer}</View>
    </View>
  );
};

const style = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  shutter: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    display: 'flex',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowColor: COLORS.gray_3,
    elevation: 4,
  },
  logo: {
    width: 64,
    height: 64,
    marginVertical: 48,
  },
  footer: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShutterView;
