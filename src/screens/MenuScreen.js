import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// icons
import IconFE from 'react-native-vector-icons/Feather';
import IconIO from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';

// constants
import {COLORS, FONTS} from '../constants/index.js';

// components
import SearchBar from '../components/SearchBar.js';
import BottomLine from '../components/BottomLine.js';

const MenuScreen = props => {
  const MenuItem = props => {
    return (
      <>
        <TouchableOpacity style={style.menu_item} onPress={props.onPress}>
          <View style={{marginHorizontal: 10}}>{props.icon}</View>
          <Text style={style.text}>{props.text}</Text>
        </TouchableOpacity>
        <BottomLine />
      </>
    );
  };

  return (
    <View
      style={{width: '100%', height: '100%', backgroundColor: COLORS.white}}>
      <SearchBar />
      <ScrollView>
        <MenuItem
          icon={<IconFE name="user" color={COLORS.primary} size={28} />}
          text="View Profile"
          onPress={() => props.navigation.navigate('profile')}
        />
        <MenuItem
          icon={<IconFE name="edit" color={COLORS.primary} size={28} />}
          text="Edit Profile"
          onPress={() => props.navigation.navigate('edit_profile')}
        />
        <MenuItem
          icon={<IconFE name="camera" color={COLORS.primary} size={28} />}
          text="Photos"
          onPress={() => props.navigation.navigate('album')}
        />
        <MenuItem
          onPress={() => alert('Notificaton setting changed')}
          icon={
            <IconIO
              name="notifications-outline"
              color={COLORS.primary}
              size={28}
            />
          }
          text="Notification"
        />
        <MenuItem
          icon={<IconMI name="block" color={COLORS.primary} size={28} />}
          text="Blocked"
          onPress={() => props.navigation.navigate('blocked')}
        />
        <MenuItem
          icon={<IconMI name="logout" color={COLORS.primary} size={28} />}
          text="Log Out"
          onPress={() => {
            Alert.alert('Logout', 'Do you really want to logout?', [
              {
                text: 'Yes',
                onPress: () => {
                  AsyncStorage.removeItem('@token');
                  props.navigation.navigate('auth');
                },
              },
              {
                text: 'No',
                onPress: () => {},
              },
            ]);
          }}
        />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  menu_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 64,
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.gray_2,
  },
});

export default MenuScreen;
