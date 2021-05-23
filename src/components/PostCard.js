import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOC from 'react-native-vector-icons/Octicons';
import IconIO from 'react-native-vector-icons/Ionicons';

// constants
import {COLORS, FONTS} from '../constants';

// components
import InfoCard from './InfoCard.js';

const PostCard = props => {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: 20}}>
      <InfoCard
        image={props.profile}
        title={props.user}
        body={props.caps}
        card_press={() => navigation.navigate('comment')}
      />
      <View>
        <Image style={style.image} source={{uri: props.image}} />
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <TouchableOpacity style={style.button}>
          <IconFA
            name={props.loved ? 'heart' : 'heart-o'}
            size={24}
            color={props.loved ? '#dd4020' : COLORS.slate_1}
          />
          <Text style={style.button_text}>{props.love}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('comment')}>
          <IconOC name="comment" size={24} color={COLORS.slate_1} />
          <Text style={style.button_text}>{props.comment}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button}>
          <IconIO
            name="md-arrow-redo-outline"
            size={24}
            color={COLORS.slate_1}
          />
          <Text style={style.button_text}>{props.share}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: 240,
    maxWidth: '100%',
  },
  button: {
    width: '30%',
    height: 36,
    borderRadius: 18,
    borderColor: COLORS.slate_1,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button_text: {
    fontFamily: FONTS.font_medium,
    fontSize: 16,
    color: COLORS.slate_3,
  },
});

export default PostCard;
