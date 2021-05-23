import React from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// constants
import {COLORS} from '../constants';

// components
import LoadingIndicator from '../components/LoadingIndicator.js';

const ZoomScreen = props => {
  const [showModal, setShowModal] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [imgUrls, setImgUrls] = React.useState([
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
    {url: 'https://picsum.photos/480'},
  ]);

  const show_images = () => {
    if (!loading) {
      return (
        <Modal visible={showModal} transparent={true}>
          <ImageViewer
            imageUrls={imgUrls}
            index={props.route.params.init_img_indx}
            onSwipeDown={() => {
              props.navigation.goBack();
            }}
            swipeDownThreshold={230}
            enableSwipeDown={true}
          />
        </Modal>
      );
    }
  };

  return (
    <View style={style.canvas}>
      {show_images()}
      <Image
        style={style.image}
        source={require('../Assets/Images/gallery.png')}
      />
      <LoadingIndicator show={loading} />
    </View>
  );
};

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    minHeight: 200,
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
});

export default ZoomScreen;
