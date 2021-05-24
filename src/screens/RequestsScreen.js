import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import {base_url} from '../../conf.js';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';
import {COLORS} from '../constants/index.js';

const Requests = props => {
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
              setReload(!reload);
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert('User does not send you friend request!');
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
              setReload(!reload);
            } else if (res.status === 404) {
              alert('User does not send you friend request!');
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
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
                setAllUsers(
                  json.map((data, index) => {
                    return (
                      <ButtonCard
                        key={'req-scr-btn-crd-' + index}
                        title={data.name}
                        body={data.email}
                        button1="Accept"
                        button2="Reject"
                        onPress1={() => accept_api(data.cid)}
                        onPress2={() => reject_api(data.cid)}
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
    <ScrollView
      style={{height: '100%', backgroundColor: COLORS.white}}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => setReload(!reload)}
        />
      }>
      <View style={{height: '100%', backgroundColor: COLORS.white}}>
        <SearchBar />
        {allUsers}
        <View style={{height: 500}} />
      </View>
    </ScrollView>
  );
};

export default Requests;
