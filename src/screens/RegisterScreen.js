import React from 'react';
import {base_url} from '../../conf.js';

// components
import ShutterView from '../components/ShutterView.js';
import InputBox from '../components/InputBox.js';
import PasswordBox from '../components/PasswordBox.js';
import PushButton from '../components/PushButton';

const RegisterScreen = props => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [password2, setPassword2] = React.useState(null);

  const register_api = () => {
    if (!(name && email && password && password2)) {
      alert('Please fill all the fields.');
      return;
    } else if (password !== password2) {
      alert("Two passwords doesn't match!");
      return;
    }

    fetch(base_url + '/user/register', {
      method: 'PST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          props.navigation.navigate('verify', {email});
        } else if (res.status === 409) {
          alert('Account already exist with this email');
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
    <ShutterView>
      <InputBox
        onChangeText={text => setName(text.trim())}
        placeholder="Enter full name"
        autoCapitalize="words"
      />
      <InputBox
        onChangeText={text => setEmail(text.trim())}
        placeholder="Enter email"
        autoCapitalize="none"
      />
      <PasswordBox
        onChangeText={text => setPassword(text.trim())}
        placeholder="Enter password"
      />
      <PasswordBox
        onChangeText={text => setPassword2(text.trim())}
        placeholder="Re-type password"
      />
      <PushButton text="Register" onPress={register_api} />
    </ShutterView>
  );
};

export default RegisterScreen;
