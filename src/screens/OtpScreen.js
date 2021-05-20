import React from 'react';
import {StyleSheet, Text} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

// components
import ShutterView from '../components/ShutterView.js';
import InputBox from '../components/InputBox.js';
import PushButton from '../components/PushButton.js';

const OtpScreen = props => {
  const [otp, setOtp] = React.useState(null);

  const goto_reset_view = () => {
    if (!otp) {
      alert('Please enter the OTP!');
      return;
    }
    props.navigation.navigate('reset', {otp});
  };

  return (
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
        onChangeText={text => setOtp(text.trim())}
        autoCompleteType="off"
      />
      <PushButton text="Submit" onPress={goto_reset_view} />
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

export default OtpScreen;
