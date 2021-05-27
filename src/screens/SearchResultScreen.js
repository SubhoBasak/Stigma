import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';
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

  const block_api = user => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/block', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({user}),
        })
          .then(res => {
            if (res.status === 200) {
              setReload(!reload);
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 405) {
              alert('Not allowed!');
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
                          image={
                            data.image
                              ? base_url + '/profile/' + data.uid + '.jpg'
                              : null
                          }
                          title={data.name}
                          body={data.email}
                          button1="Block"
                          button2="Request"
                          onPress1={() => block_api(data.uid)}
                          onPress2={() => send_request_api(data.uid)}
                        />
                      );
                    } else if (data.status === '1') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={
                            data.image
                              ? base_url + '/profile/' + data.uid + '.jpg'
                              : null
                          }
                          title={data.name}
                          body="Connection requested send"
                          button1="Cancel"
                          onPress1={() => cancel_request_api(data.cid)}
                        />
                      );
                    } else if (data.status === '2') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={
                            data.image
                              ? base_url + '/profile/' + data.uid + '.jpg'
                              : null
                          }
                          title={data.name}
                          body="Has send you connection request"
                          button1="Accept"
                          button2="Reject"
                          onPress1={accept_api}
                          onPress2={reject_api}
                        />
                      );
                    } else if (data.status === '3') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={
                            data.image
                              ? base_url + '/profile/' + data.uid + '.jpg'
                              : null
                          }
                          title={data.name}
                          body={data.email}
                          button1="Profile"
                          button2="Message"
                          onPress1={() =>
                            props.navigation.navigate('profile', {
                              uid: data.uid,
                            })
                          }
                          onPress2={() => props.navigation.navigate('message')}
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
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(!reload)}
          />
        }>
        {users}
      </ScrollView>
      <LoadingIndicator show={loading} />
    </>
  );
};

export default SearchResultScreen;
