import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

// constants
import {COLORS} from '../constants';

const LoadingIndicator = props => {
  if (props.show) {
    return (
      <View style={style.canvas}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  } else {
    return <></>;
  }
};

const style = StyleSheet.create({
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff80',
  },
});

export default LoadingIndicator;
