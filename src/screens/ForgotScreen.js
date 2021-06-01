import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {base_url} from '../../conf.js';

// constants
import {FONTS, COLORS} from '../constants';

// components
import ShutterView from '../components/ShutterView.js';
import InputBox from '../components/InputBox.js';
import PushButton from '../components/PushButton.js';

const ForgotScreen = props => {
  const [email, setEmail] = React.useState(null);

  const forgot_api = () => {
    if (!email) {
      return alert('Please enter the email.');
    }

    fetch(base_url + '/user/forgot', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email}),
    })
      .then(res => {
        if (res.status === 200) props.navigation.navigate('otp', {email});
        else if (res.status === 404)
          props.navigation.navigate('warning', {status: 0});
        else if (res.status === 500)
          props.navigation.navigate('warning', {status: 1});
      })
      .catch(() => props.navigation.navigate('warning', {status: 3}));
  };

  return (
    <ShutterView>
      <Text style={style.text}>
        Please enter the registered email address and verify you identity
        through the OTP to reset your password.
      </Text>
      <InputBox
        placeholder="Enter the email"
        onChangeText={text => setEmail(text.trim())}
        autoCapitalize="none"
      />
      <PushButton text="Send OTP" onPress={forgot_api} />
    </ShutterView>
  );
};

const style = StyleSheet.create({
  text: {
    width: '90%',
    fontFamily: FONTS.font_regular,
    fontSize: 16,
    color: COLORS.gray_2,
    marginBottom: 32,
  },
});

export default ForgotScreen;
