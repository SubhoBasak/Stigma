import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS, FONTS} from '../constants/index.js';

// components
import ShutterView from '../components/ShutterView.js';
import InputBox from '../components/InputBox.js';
import PasswordBox from '../components/PasswordBox.js';
import PushButton from '../components/PushButton.js';

const LoginScreen = props => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const login_api = () => {
    if (!(email && password)) {
      alert('Please enter the email and password.');
      return;
    }

    fetch(base_url + '/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
      .then(res => {
        if (res.status === 200) {
          res
            .json()
            .then(json => {
              AsyncStorage.setItem('@token', json.token);
              props.navigation.navigate('main');
            })
            .catch(error => {
              return props.navigation.navigate('warning', {status: 3});
            });
        } else if (res.status === 401) {
          alert('User not verified!');
          return;
        } else if (res.status === 500) {
          return props.navigation.navigate('warning', {status: 1});
        }
      })
      .catch(error => {
        return props.navigation.navigate('warning', {status: 3});
      });
    setTimeout(() => {
      return props.navigation.navigate('warning', {status: 2});
    }, 10000);
  };

  return (
    <ShutterView
      footer={
        <Text
          onPress={() => props.navigation.navigate('register')}
          style={style.footer}>
          Register Now
        </Text>
      }>
      <InputBox
        placeholder="Enter the email"
        onChangeText={text => setEmail(text.trim())}
        autoCapitalize="none"
      />
      <PasswordBox
        placeholder="Enter the password"
        onChangeText={text => setPassword(text.trim())}
      />
      <PushButton text="Log In" onPress={login_api} />
      <TouchableOpacity onPress={() => props.navigation.navigate('forgot')}>
        <Text style={style.link}>Forgot Password</Text>
      </TouchableOpacity>
    </ShutterView>
  );
};

const style = StyleSheet.create({
  link: {
    fontFamily: FONTS.font_regular,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 32,
  },
  footer: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 32,
  },
});

export default LoginScreen;
