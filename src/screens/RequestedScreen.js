import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl, FlatList, SafeAreaView, Alert} from 'react-native';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants/index.js';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';

const Requested = props => {
  const [loading, setLoading] = React.useState(true);
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const cancel_request = cid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/cancel', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({cid}),
        })
          .then(res => {
            if (res.status === 200) {
              return setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else if (res.status === 404) {
              props.navigation.goBack();
              return props.navigation.navigate('warning', {status: 0});
            } else if (res.status === 500) {
              props.navigation.goBack();
              return props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(error => {
            props.navigation.goBack();
            return props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(error => {
        alert('Please login again.');
        return props.navigation.navigate('auth');
      });
  };

  const cancel_warning = cid => {
    Alert.alert('Cancel', 'Do you really want to cancel connection request?', [
      {text: 'Yes', onPress: () => cancel_request(cid)},
      {text: 'No', onPress: () => {}},
    ]);
  };

  const ButtonCardWrapper = ({item}) => {
    return (
      <ButtonCard
        title={item.name}
        body={item.email}
        image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
        button1="Cancel"
        onPress1={() => cancel_warning(item.cid)}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/requested', {
          method: 'GET',
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllUsers(json))
                .catch(() => {
                  props.navigation.goBack();
                  return props.navigation.navigate('warning', {status: 3});
                });
            } else if (res.status === 401) {
              alert('Unauthorized user! Please login now.');
              AsyncStorage.clear();
              return props.navigation.navigate('auth');
            } else {
              return props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(() => {
            setLoading(false);
            props.navigation.goBack();
            return props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(error => {
        alert('Unauthorized user! Please login now.');
        return props.navigation.navigate('auth');
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
            refreshing={loading && reload}
            onRefresh={() => setReload(!reload)}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Requested;
