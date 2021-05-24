import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// constants
import {COLORS, FONTS} from '../constants/index.js';

// screens
import Connected from './ConnectedScreen.js';
import Requested from './RequestedScreen.js';
import Requests from './RequestsScreen.js';

const TopNav = createMaterialTopTabNavigator();

const UserScreen = props => {
  return (
    <TopNav.Navigator
      style={{width: '100%', minHeight: 1000}}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.gray_1,
        indicatorStyle: {
          backgroundColor: COLORS.primary,
        },
        labelStyle: {fontFamily: FONTS.font_regular, fontSize: 12},
      }}>
      <TopNav.Screen name="Connected" component={Connected} />
      <TopNav.Screen name="Requests" component={Requests} />
      <TopNav.Screen name="Requested" component={Requested} />
    </TopNav.Navigator>
  );
};

export default UserScreen;
