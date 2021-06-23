import React from 'react';
import {SafeAreaView, FlatList, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants/index.js';

// components
import SearchBar from '../components/SearchBar.js';
import InfoCard from '../components/InfoCard.js';

const AllMessageScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const InfoCardWrapper = ({item}) => {
    return (
      <InfoCard
        title={item.name}
        body={item.email}
        image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
        card_press={() => props.navigation.navigate('message', {uid: item.uid})}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
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
      .catch(error => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <FlatList
        data={allUsers}
        renderItem={InfoCardWrapper}
        keyExtractor={item => item.uid}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(!reload)}
          />
        }
        ListHeaderComponent={<SearchBar />}
      />
    </SafeAreaView>
  );
};

export default AllMessageScreen;
