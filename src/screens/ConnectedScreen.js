import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import {base_url} from '../../conf';

// components
import InfoCard from '../components/InfoCard';
import SearchBar from '../components/SearchBar.js';
import {COLORS} from '../constants';

const Connected = () => {
  const [allUsers, setAllUsers] = React.useState([]);

  React.useEffect(async () => {
    const token = await AsyncStorage.getItem('@token');

    if (!token) {
      alert('Please login again.');
      return props.navigation.navigate('auth');
    }

    fetch(base_url + '/connection/connected', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Authorization: token},
    })
      .then(res => {
        if (res.status === 200) {
          res
            .json()
            .then(json => {
              setAllUsers(
                json.map((data, index) => {
                  return (
                    <InfoCard
                      key={'info-card-' + index}
                      image={data.image}
                      title={data.name}
                      body={data.email}
                    />
                  );
                }),
              );
            })
            .catch(error => {
              props.navigation.goBack();
              return props.navigation.navigate('warning', {status: 3});
            });
        } else if (res.status === 401) {
          alert('You are unauthorized to access this page! Please login now.');
          props.navigation.navigate('auth');
          return;
        } else if (res.status === 500) {
          props.navigation.goBack();
          return props.navigation.navigate('warning', {status: 1});
        }
      })
      .catch(error => {
        props.navigation.goBack();
        return props.navigation.navigate('warning', {status: 3});
      });
  }, []);

  return (
    <ScrollView style={{height: '100%', backgroundColor: COLORS.white}}>
      <SearchBar />
      {allUsers}
      <View style={{height: 500}} />
    </ScrollView>
  );
};

export default Connected;
