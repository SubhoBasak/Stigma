import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import {base_url} from '../../conf';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';
import {COLORS} from '../constants';

const Connected = props => {
  const [loading, setLoading] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const remove_api = cid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/remove', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({cid}),
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              setReload(!reload);
            } else if (res.status === 404) {
              alert('Connection not found!');
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else {
              props.navigation.navigate('warning', {status: 3});
            }
          })
          .catch(error => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(error => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

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
                    <ButtonCard
                      key={'info-card-' + index}
                      image={
                        data.image
                          ? base_url + '/profile/' + data.uid + '.jpg'
                          : null
                      }
                      title={data.name}
                      body={data.email}
                      button1="Message"
                      button2="Remove"
                      onPress1={() => props.navigation.navigate('message')}
                      onPress2={() => remove_api(data.cid)}
                      card_press={() => props.navigation.navigate('profile')}
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
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        props.navigation.goBack();
        return props.navigation.navigate('warning', {status: 3});
      });
    setLoading(true);
  }, [reload]);

  return (
    <ScrollView
      style={{height: '100%', backgroundColor: COLORS.white}}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => setReload(!reload)}
        />
      }>
      <SearchBar />
      {allUsers}
      <View style={{height: 500}} />
    </ScrollView>
  );
};

export default Connected;
