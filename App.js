import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// constants
import {COLORS, FONTS} from './src/constants';

// screens
import AuthScreen from './src/screens/AuthScreen.js';
import MainScreen from './src/screens/MainScreen.js';
import BlockedScreen from './src/screens/BlockedScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import PhotosScreen from './src/screens/PhotosScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import SearchResultScreen from './src/screens/SearchResultScreen';
import WarningScreen from './src/screens/WarningScreen';

const StackNav = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <NavigationContainer>
        <StackNav.Navigator
          screenOptions={{
            headerShown: false,
            headerTitleStyle: {
              fontFamily: FONTS.font_regular,
            },
            headerStyle: {
              shadowColor: COLORS.gray_3,
              shadowOffset: 5,
              shadowOpacity: 1,
              shadowRadius: 3,
            },
          }}>
          <StackNav.Screen name="auth" component={AuthScreen} />
          <StackNav.Screen name="main" component={MainScreen} />
          <StackNav.Screen
            name="blocked"
            component={BlockedScreen}
            options={{headerShown: true, headerTitle: 'Blocked'}}
          />
          <StackNav.Screen
            name="album"
            component={AlbumScreen}
            options={{headerShown: true, headerTitle: 'Album'}}
          />
          <StackNav.Screen
            name="photos"
            component={PhotosScreen}
            options={{headerShown: true, headerTint: 'Photos'}}
          />
          <StackNav.Screen
            name="profile"
            component={UserProfileScreen}
            options={{headerTint: 'Photos'}}
          />
          <StackNav.Screen name="search" component={SearchResultScreen} />
          <StackNav.Screen name="warning" component={WarningScreen} />
        </StackNav.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
