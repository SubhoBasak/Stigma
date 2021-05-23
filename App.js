import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// constants
import {COLORS, FONTS} from './src/constants';

// screens
import AuthScreen from './src/screens/AuthScreen.js';
import MainScreen from './src/screens/MainScreen.js';
import BlockedScreen from './src/screens/BlockedScreen.js';
import AlbumScreen from './src/screens/AlbumScreen.js';
import PhotosScreen from './src/screens/PhotosScreen.js';
import UserProfileScreen from './src/screens/UserProfileScreen.js';
import SearchResultScreen from './src/screens/SearchResultScreen.js';
import WarningScreen from './src/screens/WarningScreen.js';
import EditProfileScreen from './src/screens/EditProfileScreen.js';
import ZoomScreen from './src/screens/ZoomScreen';
import SplashScreen from './src/screens/SplashScreen';
import CommentScreen from './src/screens/CommentScreen';

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
          }}
          initialRouteName="splash">
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
            options={{headerShown: true, headerTitle: 'Photos'}}
          />
          <StackNav.Screen name="profile" component={UserProfileScreen} />
          <StackNav.Screen
            name="search"
            component={SearchResultScreen}
            options={{headerShown: true, headerTitle: 'Search'}}
          />
          <StackNav.Screen name="warning" component={WarningScreen} />
          <StackNav.Screen
            name="edit_profile"
            component={EditProfileScreen}
            options={{headerShown: true, headerTitle: 'Edit profile'}}
          />
          <StackNav.Screen
            name="zoom"
            component={ZoomScreen}
            options={{headerShown: true, headerTitle: 'Image view'}}
          />
          <StackNav.Screen name="splash" component={SplashScreen} />
          <StackNav.Screen
            name="comment"
            component={CommentScreen}
            options={{headerShown: true, headerTitle: 'Comment'}}
          />
        </StackNav.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
