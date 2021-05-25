import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// components
import ButtonCard from '../components/ButtonCard.js';
import {COLORS} from '../constants/index.js';

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
              setReload(!reload);
            } else if (res.status === 405) {
              alert(
                'Not allowed! You can only unblock users whome you blocked.',
              );
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              props.navigation.navigate('auth');
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
                .then(json => {
                  setAllUsers(
                    json.map((data, index) => {
                      return (
                        <ButtonCard
                          key={'info-card-' + index}
                          button1="Unblock"
                          title={data.name}
                          body={data.email}
                          onPress1={() => unblock_api(data.cid)}
                        />
                      );
                    }),
                  );
                })
                .catch(error => {
                  props.navigation.navigate('warning', {status: 3});
                });
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
      <View style={{height: '100%'}}>
        {allUsers}
        <View style={{height: 500}} />
      </View>
    </ScrollView>
  );
};

export default BlockedScreen;
