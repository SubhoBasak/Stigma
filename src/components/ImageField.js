import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ImageField = props => {
  const select_image = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <TouchableOpacity onPress={select_image} style={style.button}>
      <Text style={style.text}>{image_text || 'Select image'}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
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
  text: {
    color: Colors.slate_2,
  },
});

export default ImageField;
