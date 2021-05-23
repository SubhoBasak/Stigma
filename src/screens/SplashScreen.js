import React from 'react';
import {View, Image, Text, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// constants
import {COLORS, FONTS} from '../constants';

const SplashScreen = props => {
  const [loading, setLoading] = React.useState(true);

  React.useState(async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) props.navigation.navigate('main');
    else props.navigation.navigate('auth');
    setLoading(false);
  }, []);

  return (
    <>
      <View style={style.canvas}>
        <View style={style.top_section}>
          <View style={style.top_view}>
            <Image
              source={require('../Assets/Images/logo.png')}
              style={style.logo}
            />
          </View>
        </View>
        <View style={style.bottom_section}>
          <View style={style.bottom_view}>
            <ActivityIndicator size="large" color={COLORS.white} />
            <Text style={style.text}>Subho Basak</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  top_section: {
    width: '100%',
    height: '50%',
    backgroundColor: COLORS.primary,
  },
  bottom_section: {
    width: '100%',
    height: '50%',
    backgroundColor: COLORS.white,
  },
  top_view: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderBottomRightRadius: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_view: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 80,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: 128,
    height: 128,
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.white,
  },
});

export default SplashScreen;
