import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

// components
import PushButton from '../components/PushButton.js';

const DeleteModal = props => {
  return (
    <Modal visible={props.visible} transparent={true} animationType="slide">
      <View style={style.canvas}>
        <Text style={style.header}>Delete</Text>
        <Text style={style.info}>{props.info}</Text>
        <View style={style.btn_grid}>
          <PushButton text="Delete" onPress={props.delete} />
          <PushButton text="Cancel" onPress={props.cancel} />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  canvas: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    fontFamily: FONTS.font_medium,
    fontSize: 22,
    marginVertical: 10,
    color: COLORS.gray_2,
  },
  info: {
    fontFamily: FONTS.font_light,
    fontSize: 18,
    color: COLORS.gray_3,
  },
  btn_grid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DeleteModal;
