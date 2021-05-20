import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {base_url} from '../../conf.js';

// icons
import IconIO from 'react-native-vector-icons/Ionicons';

// constants
import {FONTS, COLORS} from '../constants';

const SearchBar = props => {
  const [keyword, setKeyword] = React.useState(null);

  const navigation = useNavigation();

  const result_screen = () => {
    if (!keyword) return;

    navigation.navigate('search', {keyword});
  };

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      }}>
      <View style={style.input_box}>
        <TextInput
          style={style.input}
          placeholder="Search..."
          onChangeText={text => setKeyword(text)}
          returnKeyType="search"
          onSubmitEditing={result_screen}
        />
        <IconIO
          onPress={result_screen}
          name="search-sharp"
          size={24}
          color={COLORS.slate_3}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  input_box: {
    width: '95%',
    height: 50,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderColor: COLORS.slate_1,
    borderWidth: 2,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    fontFamily: FONTS.font_regular,
    fontSize: 20,
    color: COLORS.slate_3,
  },
});

export default SearchBar;
