import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

// icons
import IconF from 'react-native-vector-icons/Feather';

// components
import SearchBar from '../components/SearchBar.js';
import StatusBar from '../components/StatusBar.js';
import PostCard from '../components/PostCard.js';
import {COLORS, FONTS} from '../constants/index.js';

const HomeScreen = props => {
  const all_post = [
    <PostCard
      key="post-card-0"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only. This is a long long long post caption for testing purpose only. This is a long long long post caption for testing purpose only. This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
      loved={true}
    />,
    <PostCard
      key="post-card-1"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
    />,
    <PostCard
      key="post-card-2"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
    />,
  ];
  return (
    <View style={{backgroundColor: COLORS.white}}>
      <SearchBar />
      <ScrollView>
        <StatusBar />
        <View style={style.upload}>
          <TouchableOpacity
            style={style.upload_btn}
            onPress={() => props.navigation.navigate('post')}>
            <IconF style={style.upload_icon} name="upload" />
            <Text style={style.upload_txt}>Post image</Text>
          </TouchableOpacity>
        </View>
        {all_post}
        <View style={{height: 200}} />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  upload: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  upload_btn: {
    height: 34,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginRight: 15,
    borderRadius: 17,
    borderColor: COLORS.slate_1,
    borderWidth: 1,
  },
  upload_icon: {
    fontSize: 22,
    color: COLORS.primary,
    marginRight: 5,
  },
  upload_txt: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.gray_1,
  },
});

export default HomeScreen;
