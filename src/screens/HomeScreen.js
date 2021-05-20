import React from 'react';
import {View, ScrollView} from 'react-native';

// components
import SearchBar from '../components/SearchBar.js';
import StatusBar from '../components/StatusBar.js';
import PostCard from '../components/PostCard.js';
import {COLORS} from '../constants/index.js';

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
        {all_post}
        <View style={{height: 200}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
