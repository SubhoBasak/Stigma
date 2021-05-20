import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

// components
import SearchBar from '../components/SearchBar.js';
import InfoCard from '../components/InfoCard.js';
import {COLORS, FONTS} from '../constants/index.js';

const NotificationScreen = props => {
  const all_notifications = [
    <InfoCard
      key="info-card-0"
      badge=" * "
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-1"
      badge=" * "
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-2"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-3"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-4"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-5"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-6"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-7"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-8"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-9"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-10"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-11"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
    <InfoCard
      key="info-card-12"
      image="https://picsum.photos/128"
      title="New notification"
      body="Notification long body text."
    />,
  ];

  return (
    <View style={{backgroundColor: COLORS.white}}>
      <SearchBar />
      <View style={style.layout}>
        <Text style={style.text}>Mark all as read</Text>
      </View>
      <ScrollView>
        <View>
          {all_notifications}
          <View style={{height: 150}} />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 16,
    color: COLORS.primary,
    marginVertical: 5,
  },
});

export default NotificationScreen;
