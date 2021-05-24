import React from 'react';
import {ScrollView} from 'react-native';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import PostCard from '../components/PostCard.js';
import Compose from '../components/Compose.js';

const CommentScreen = () => {
  return (
    <>
      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: COLORS.white}}>
        <PostCard
          key="post-card-2"
          profile="https://picsum.photos/128"
          image="https://picsum.photos/320/240"
          user="User Name"
          caps="This is a long long long post caption for testing purpose only."
          love="15K"
          comment="1K"
          share="100"
        />
      </ScrollView>
      <Compose />
    </>
  );
};

export default CommentScreen;
