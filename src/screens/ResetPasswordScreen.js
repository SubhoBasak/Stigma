import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {base_url} from '../../conf.js';

// constants
import {FONTS, COLORS} from '../constants';

// components
import ShutterView from '../components/ShutterView.js';
import PasswordBox from '../components/PasswordBox.js';
import PushButton from '../components/PushButton';

const ResetPasswordScreen = props => {
  const [password, setPassword] = React.useState(null);
  const [password2, setPassword2] = React.useState(null);

  const reset_api = () => {
    if (!password || !password2) {
      alert('Please enter all the fields.');
      return;
    } else if (password !== password2) {
      alert('New passwords does not match!');
      return;
    }

    fetch(base_url + '/user/reset', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        otp: props.route.params.otp,
        email: props.route.params.email,
        password,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          props.navigation.navigate('login');
        } else if (res.status === 404) {
          props.navigation.goBack();
          return props.navigation.navigate('warning', {status: 1});
        } else if (res.status === 401) {
          alert('OTP expired or Invalid OTP.');
          return;
        } else {
          alert('Server Error! Please try again later.');
        }
      })
      .catch(error => {
        return props.navigation.navigate('warning', {status: 3});
      });
  };

  return (
    <ShutterView>
      <Text
        style={[
          style.text,
          {fontFamily: FONTS.font_bold, textAlign: 'center'},
        ]}>
        Reset Password
      </Text>
      <PasswordBox
        onChangeText={text => setPassword(text.trim())}
        placeholder="Enter new password"
      />
      <PasswordBox
        onChangeText={text => setPassword2(text.trim())}
        placeholder="Re-type new password"
      />
      <PushButton text="Register" onPress={reset_api} />
    </ShutterView>
  );
};

const style = StyleSheet.create({
  text: {
    width: '90%',
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.gray_2,
    marginBottom: 32,
  },
});

export default ResetPasswordScreen;
