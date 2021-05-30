import React from 'react';
import {FlatList, RefreshControl, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants/index.js';

// components
import ButtonCard from '../components/ButtonCard.js';

const BlockedScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const unblock_api = cid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/unblock', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({cid}),
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else if (res.status === 405) {
              alert(
                'Not allowed! You can only unblock users whome you blocked.',
              );
              setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            }
          })
          .catch(() => {
            setLoading(false);
            props.navigation.navigate('warning', {status: 1});
          });
        setLoading(true);
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const ButtonCardWrapper = ({item}) => {
    return (
      <ButtonCard
        image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
        title={item.name}
        body={item.email}
        button1="Unblock"
        onPress1={() => unblock_api(item.cid)}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/blocked', {
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllUsers(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
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
  }, [reload]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <FlatList
        data={allUsers}
        renderItem={ButtonCardWrapper}
        keyExtractor={item => item.uid}
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

export default BlockedScreen;
