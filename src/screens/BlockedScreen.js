import React from 'react';
import {ScrollView, View} from 'react-native';

// components
import ButtonCard from '../components/ButtonCard.js';
import {COLORS} from '../constants/index.js';

const BlockedScreen = () => {
  const [allUsers, setAllUsers] = React.useState([]);

  const all_users = [
    <ButtonCard
      button1="Unblock"
      key="info-card-1"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
  ];

  return (
    <ScrollView style={{height: '100%', backgroundColor: COLORS.white}}>
      <View style={{height: '100%'}}>
        {allUsers}
        <View style={{height: 500}} />
      </View>
    </ScrollView>
  );
};

export default BlockedScreen;
