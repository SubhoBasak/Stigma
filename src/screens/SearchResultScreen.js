import React from 'react';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import ButtonCard from '../components/ButtonCard.js';
import LoadingIndicator from '../components/LoadingIndicator.js';

const SearchResultScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const send_request_api = uid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/send_request', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({user: uid}),
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              setReload(!reload);
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

  const accept_request_api = () => {
    return;
  };

  const reject_request_api = () => {
    return;
  };

  const cancel_request_api = cid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/cancel', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({cid}),
        })
          .then(res => {
            if (res.status === 200) {
              setReload(!reload);
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              props.navigation.navigate('auth');
            } else {
              props.navigation.navigate('warning', {status: 3});
            }
          })
          .catch(error => {
            props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(error => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(
          base_url +
            '/connection/search?' +
            new URLSearchParams({keyword: props.route.params.keyword}),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: token,
            },
          },
        )
          .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(json => {
                  const tmp = json.map((data, index) => {
                    if (data.status === '0') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.name}
                          body={data.email}
                          button1="Profile"
                          button2="Request"
                          onPress2={() => send_request_api(data.uid)}
                        />
                      );
                    } else if (data.status === '1') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.name}
                          body="Connection requested send"
                          button1="Profile"
                          button2="Cancel"
                          onPress2={() => cancel_request_api(data.cid)}
                        />
                      );
                    } else if (data.status === '2') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.name}
                          body="Has send you connection request"
                          button1="Accept"
                          button2="Reject"
                        />
                      );
                    } else if (data.status === '3') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.name}
                          body={data.email}
                          button1="Profile"
                          button2="Message"
                        />
                      );
                    }
                  });
                  setLoading(false);
                  if (tmp.length === 0) {
                    props.navigation.goBack();
                    return props.navigation.navigate('warning', {status: 0});
                  } else {
                    setUsers(tmp);
                  }
                })
                .catch(error => {
                  setLoading(false);
                  props.navigation.goBack();
                  return props.navigation.navigate('warning', {status: 3});
                });
            } else if (res.status === 500) {
              setLoading(false);
              props.navigation.goBack();
              props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(error => {
            setLoading(false);
            props.navigation.goBack();
            return props.navigation.navigate('warning', {status: 3});
          });
        setLoading(true);
      })
      .catch(error => {
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.white,
        }}>
        {users}
      </ScrollView>
      <LoadingIndicator show={loading} />
    </>
  );
};

export default SearchResultScreen;
