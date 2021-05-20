import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

// components
import BottomLine from './BottomLine.js';

const InfoCard = props => {
  const [showFull, setShowFull] = React.useState(false);

  const Badge = () => {
    if (props.badge) return <Text style={style.badge}>{props.badge}</Text>;
    return <></>;
  };
  const body = props.body;

  return (
    <>
      <TouchableOpacity onPress={props.card_press} style={style.card}>
        <Image
          onPress={props.image_press}
          style={style.image}
          source={
            props.image
              ? {uri: props.image}
              : require('../Assets/Images/photo.png')
          }
        />
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={style.title} onPress={props.title_press}>
              {props.title}
            </Text>
            <Badge />
          </View>
          <Text style={style.body}>{body}</Text>
        </View>
      </TouchableOpacity>
      <BottomLine />
    </>
  );
};

const style = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 7,
  },
  title: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.gray_2,
  },
  body: {
    minWidth: 200,
    maxWidth: '90%',
    fontFamily: FONTS.font_light,
    fontSize: 16,
    color: COLORS.gray_2,
  },
  badge: {
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: COLORS.primary,
    fontFamily: FONTS.font_light,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default InfoCard;
