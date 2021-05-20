import React from 'react';
import {View} from 'react-native';

// constants
import {COLORS} from '../constants';

const BottomLine = props => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
      <View
        style={{width: '80%', height: 1, backgroundColor: COLORS.slate_1}}
      />
    </View>
  );
};

export default BottomLine;
