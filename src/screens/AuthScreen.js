import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import LoginScreen from './LoginScreen.js';
import RegisterScreen from './RegisterScreen.js';
import ForgotScreen from './ForgotScreen.js';
import OtpScreen from './OtpScreen.js';
import VerifyScreen from './VerifyScreen.js';
import ResetPasswordScreen from './ResetPasswordScreen.js';

const StackNav = createStackNavigator();

const AuthScreen = props => {
  return (
    <StackNav.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="login" component={LoginScreen} />
      <StackNav.Screen name="register" component={RegisterScreen} />
      <StackNav.Screen name="forgot" component={ForgotScreen} />
      <StackNav.Screen name="otp" component={OtpScreen} />
      <StackNav.Screen name="verify" component={VerifyScreen} />
      <StackNav.Screen name="reset" component={ResetPasswordScreen} />
    </StackNav.Navigator>
  );
};

export default AuthScreen;
