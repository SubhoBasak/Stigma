import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// constants
import {COLORS} from '../constants';

// icons
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIO from 'react-native-vector-icons/Ionicons';

// screens
import HomeScreen from './HomeScreen.js';
import UserScreen from './UserScreen.js';
import NotificationScreen from './NotificationScreen.js';
import MenuScreen from './MenuScreen.js';
import AllMessageScree from './AllMessageScreen.js';

const BottomNav = createBottomTabNavigator();

const MainScreen = props => {
  return (
    <BottomNav.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        showLabel: false,
        inactiveTintColor: COLORS.slate_1,
      }}>
      <BottomNav.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconFA5 name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="user"
        component={UserScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconFA5 name="user-friends" size={size} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="all_message"
        component={AllMessageScree}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconMCI name="message-reply" size={size} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconMCI name="bookmark-multiple" size={size} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconIO name="copy" size={size} color={color} />
          ),
        }}
      />
    </BottomNav.Navigator>
  );
};

export default MainScreen;
