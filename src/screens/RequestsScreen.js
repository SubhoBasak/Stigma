import React from 'react';
import {ScrollView, View} from 'react-native';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';
import {COLORS} from '../constants/index.js';

const Requests = () => {
  const [allUsers, setAllUsers] = React.useState([]);

  const all_users = [
    <ButtonCard
      button1="Cancel"
      key="info-card-0"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-1"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-2"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-3"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-4"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-5"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-6"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-7"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-8"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-9"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-10"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
    <ButtonCard
      button1="Cancel"
      key="info-card-11"
      image="https://picsum.photos/128"
      title="User Name"
      body="User Bio Text"
    />,
  ];

  return (
    <ScrollView style={{height: '100%'}}>
      <View style={{height: '100%', backgroundColor: COLORS.white}}>
        <SearchBar />
        {all_users}
        <View style={{height: 500}} />
      </View>
    </ScrollView>
  );
};

export default Requests;
