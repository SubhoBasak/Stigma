import React from 'react';
import {RefreshControl, Alert, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf';

// constants
import {COLORS} from '../constants';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';

const Connected = props => {
  const [loading, setLoading] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [token, setToken] = React.useState(null);

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
              setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else if (res.status === 404) {
              alert('Connection not found!');
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else {
              props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(() => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const remove_warning = cid => {
    Alert.alert('Remove', 'Do you really want to remove the connection?', [
      {
        text: 'Yes',
        onPress: () => remove_api(cid),
      },
      {text: 'No', onPress: () => {}},
    ]);
  };

  const ButtonCardWrapper = ({item}) => {
    return (
      <ButtonCard
        title={item.name}
        image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
        body={item.email}
        button1="Remove"
        button2="Message"
        onPress1={() => remove_warning(item.cid)}
        onPress2={() =>
          props.navigation.navigate('message', {uid: item.uid, token})
        }
        card_press={() => props.navigation.navigate('profile', {uid: item.uid})}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        setToken(token);
        fetch(base_url + '/connection/connected', {
          method: 'GET',
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllUsers(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else props.navigation.navigate('warning', {status: 1});
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <FlatList
        data={allUsers}
        renderItem={ButtonCardWrapper}
        keyExtractor={item => item.uid}
        ListHeaderComponent={<SearchBar />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(!reload)}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Connected;
