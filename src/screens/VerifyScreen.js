import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf';

// constants
import {COLORS, FONTS} from '../constants';

// components
import ShutterView from '../components/ShutterView.js';
import InputBox from '../components/InputBox.js';
import PushButton from '../components/PushButton.js';
import LoadingIndicator from '../components/LoadingIndicator.js';

const OtpScreen = props => {
  const [otp, setOtp] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const verify_api = () => {
    if (!otp) return alert('Please enter the OTP!');

    fetch(base_url + '/user/verify', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: props.route.params.email, otp}),
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
              props.navigation.goBack();
              return props.navigation.navigate('warning', {status: 3});
            });
        } else if (res.status === 404) {
          props.navigation.goBack();
          return props.navigation.navigate('warning', {status: 1});
        } else if (res.status === 401) {
          alert('Invalid OTP!');
          return;
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        props.navigation.goBack();
        return props.navigation.navigate('warning', {status: 3});
      });
    setLoading(true);
  };

  return (
    <>
      <ShutterView>
        <Text style={[style.text, {marginBottom: 0}]}>
          Please enter the OTP send to
        </Text>
        <Text style={[style.text, {fontFamily: FONTS.font_bold}]}>
          {props.route.params.email}
        </Text>
        <Text style={style.text}>OTP will expire in: 10 min</Text>
        <InputBox
          placeholder="Enter the OTP"
          keyboardType="numeric"
          maxLength={6}
          onChangeText={text => setOtp(Number.parseInt(text))}
        />
        <PushButton text="Submit" onPress={verify_api} />
      </ShutterView>
      <LoadingIndicator show={loading} />
    </>
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

export default OtpScreen;
