import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, View} from 'react-native';
import {base_url} from '../../conf.js';

// components
import ButtonCard from '../components/ButtonCard.js';
import SearchBar from '../components/SearchBar.js';
import {COLORS} from '../constants/index.js';

const Requested = props => {
  const [allUsers, setAllUsers] = React.useState([]);
  const [reload, setReload] = React.useState(true);

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
              return setReload(!reload);
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

  React.useEffect(async () => {
    const token = await AsyncStorage.getItem('@token');

    if (!token) {
      alert('Please login again.');
      return props.navigation.navigate('auth');
    }

    fetch(base_url + '/connection/requested', {
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
                      key={'requestd-card-' + index}
                      image={data.image}
                      title={data.name}
                      body={data.email}
                      button1="Cancel"
                      onPress1={() => cancel_request(data.cid)}
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
          alert('Unauthorized user! Please login now.');
          props.navigation.navigate('auth');
        } else {
          alert(
            "Server Error!\nCouldn't get requested users. Please try again later.",
          );
        }
      })
      .catch(error => {
        props.navigation.goBack();
        return props.navigation.navigate('warning', {status: 3});
      });
  }, [reload]);

  return (
    <ScrollView style={{height: '100%', backgroundColor: COLORS.white}}>
      <View style={{height: '100%'}}>
        <SearchBar />
        {allUsers}
        <View style={{height: 500}} />
      </View>
    </ScrollView>
  );
};

export default Requested;
