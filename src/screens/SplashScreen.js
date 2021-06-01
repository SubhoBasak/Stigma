import React from 'react';
import {View, Image, Text, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// constants
import {COLORS, FONTS} from '../constants';

const SplashScreen = props => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(() => {
        props.navigation.navigate('main');
        setLoading(false);
      })
      .catch(() => {
        props.navigation.navigate('auth');
        setLoading(false);
      });
    setLoading(true);
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
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.white} />
            ) : null}
            <Text style={style.header}>Stigma</Text>
            <View style={style.footer}>
              <Text style={style.text}>made by Subho Basak</Text>
              <Text style={style.info}>subhobasak50@gmail.com</Text>
            </View>
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
  header: {
    fontFamily: FONTS.font_medium,
    fontSize: 32,
    color: COLORS.white,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  info: {
    fontFamily: FONTS.font_light,
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default SplashScreen;
