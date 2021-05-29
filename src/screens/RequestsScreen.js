import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Alert, FlatList, RefreshControl, SafeAreaView} from 'react-native';
import {base_url} from '../../conf.js';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';
import {COLORS} from '../constants/index.js';

const RequestsScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const accept_api = cid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/accept', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({cid}),
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert('User does not send you friend request!');
              setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else {
              props.navigation.navigate('warning', {status: 1});
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

  const reject_api = cid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/reject', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({cid}),
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              setAllUsers(allUsers.filter(item => item.cid !== cid));
            } else if (res.status === 404) {
              alert('User does not send you friend request!');
              setAllUsers(allUsers.filter(item => item.cid !== cid));
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

  const reject_warning = cid => {
    Alert.alert(
      'Reject',
      'Do you really want to reject the connection request',
      [
        {
          text: 'Yes',
          onPress: () => reject_api(cid),
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const ButtonCardWrapper = ({item}) => {
    return (
      <ButtonCard
        title={item.name}
        image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
        body={item.email}
        button1="Accept"
        button2="Reject"
        onPress1={() => accept_api(item.cid)}
        onPress2={() => reject_warning(item.cid)}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        setLoading(false);
        fetch(base_url + '/connection/requests', {
          headers: {'Content-Type': 'application/json', Authorization: token},
        }).then(res => {
          if (res.status === 200) {
            res
              .json()
              .then(json => {
                setAllUsers(json);
              })
              .catch(error => {
                props.navigation.navigate('warning', {status: 3});
              });
          } else if (res.status === 401) {
            alert('Unauthorized User! Please login now.');
            props.navigation.navigate('auth');
          } else {
            props.navigation.navigate('warning', {status: 3});
          }
        });
      })
      .catch(error => {
        setLoading(false);
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <FlatList
        data={allUsers}
        renderItem={ButtonCardWrapper}
        ListHeaderComponent={<SearchBar />}
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

export default RequestsScreen;
