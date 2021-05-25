import React from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

// icons
import IconEV from 'react-native-vector-icons/EvilIcons';

// constants
import {COLORS, FONTS} from '../constants';

// components
import PushButton from '../components/PushButton.js';

const NewPostScreen = props => {
  const [image, setImage] = React.useState(null);

  return (
    <ScrollView style={style.container}>
      <TouchableOpacity>
        <Image
          style={style.image}
          source={
            image ? {uri: image} : require('../Assets/Images/gallery.png')
          }
        />
      </TouchableOpacity>
      <View style={style.compose}>
        <PushButton text="Post" />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  compose: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: COLORS.slate_1,
  },
});

export default NewPostScreen;
