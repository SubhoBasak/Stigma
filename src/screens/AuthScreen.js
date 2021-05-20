import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import LoadingIndicator from '../components/LoadingIndicator.js';

// screens
import LoginScreen from './LoginScreen.js';
import RegisterScreen from './RegisterScreen.js';
import ForgotScreen from './ForgotScreen.js';
import OtpScreen from './OtpScreen.js';
import VerifyScreen from './VerifyScreen.js';
import ResetPasswordScreen from './ResetPasswordScreen.js';

const StackNav = createStackNavigator();

const AuthScreen = props => {
  const [loading, setLoading] = React.useState(true);

  React.useState(async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) props.navigation.navigate('main');
    setLoading(false);
  }, []);

  return (
    <>
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
      <LoadingIndicator show={loading} />
    </>
  );
};

export default AuthScreen;
