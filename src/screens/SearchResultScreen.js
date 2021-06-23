import React from 'react';
import {RefreshControl, FlatList, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import ButtonCard from '../components/ButtonCard.js';

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
              res.json().then(json => {
                setUsers(
                  users.map(item => {
                    if (item.uid === uid) {
                      item.cid = json.cid;
                      item.status = '1';
                    }
                    return item;
                  }),
                );
              });
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else props.navigation.navigate('warning', {status: 1});
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
              setUsers(
                users.map(item => {
                  if (item.cid === cid) {
                    item.status = '3';
                  }
                  return item;
                }),
              );
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert('User does not send you friend request!');
              setUsers(users.filter(item => item.cid !== cid));
            } else props.navigation.navigate('warning', {status: 1});
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
              setUsers(
                users.map(item => {
                  if (item.cid === cid) {
                    item.cid = null;
                    item.status = '0';
                  }
                  return item;
                }),
              );
            } else if (res.status === 404) {
              alert('User does not send you friend request!');
              if (res.status === 200) {
                setUsers(
                  users.map(item => {
                    if (item.cid === cid) {
                      item.status = '0';
                    }
                    return item;
                  }),
                );
              }
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else props.navigation.navigate('warning', {status: 1});
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

  const block_api = uid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/connection/block', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({uid}),
        })
          .then(res => {
            if (res.status === 200) {
              setUsers(users.filter(item => item.uid != uid));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 405) {
              alert('Not allowed!');
              setUsers(users.filter(item => item.uid != uid));
            } else {
              props.navigation.navigate('warning', {status: 1});
            }
          })
          .catch(() => {
            props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const block_warning = uid => {
    Alert.alert('Block', 'Do you really want to block this person?', [
      {
        text: 'Yes',
        onPress: () => block_api(uid),
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
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
              setUsers(
                users.map(item => {
                  if (item.cid === cid) {
                    item.cid = null;
                    item.status = '0';
                  }
                  return item;
                }),
              );
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert('User did not send you friend request.');
              setUsers(
                users.map(item => {
                  if (item.cid === cid) {
                    item.cid = null;
                    item.status = '0';
                  }
                  return item;
                }),
              );
            } else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => props.navigation.navigate('warning', {status: 3}));
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

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
              setUsers(
                users.map(item => {
                  if (item.cid === cid) {
                    item.cid = null;
                    item.status = '0';
                  }
                  return item;
                }),
              );
            } else if (res.status === 404) {
              alert('Connection not found!');
              setUsers(users.filter(item => item.cid !== cid));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else props.navigation.navigate('warning', {status: 1});
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
    if (item.status === '0') {
      return (
        <ButtonCard
          title={item.name}
          image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
          body={item.email}
          button1="Block"
          button2="Request"
          onPress1={() => block_warning(item.uid)}
          onPress2={() => send_request_api(item.uid)}
        />
      );
    } else if (item.status === '1') {
      return (
        <ButtonCard
          title={item.name}
          image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
          body={item.email}
          button1="Cancel"
          onPress1={() => cancel_request_api(item.cid)}
        />
      );
    } else if (item.status === '2') {
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
    } else if (item.status === '3') {
      return (
        <ButtonCard
          title={item.name}
          image={item.image ? base_url + '/profile/' + item.uid + '.jpg' : null}
          body={item.email}
          button1="Message"
          button2="Remove"
          onPress1={() => props.navigation.navigate('message', {uid: item.uid})}
          onPress2={() => remove_warning(item.cid)}
          card_press={() =>
            props.navigation.navigate('profile', {uid: item.uid})
          }
        />
      );
    }
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
                .then(json => setUsers(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else {
              props.navigation.navigate('warning', {status: 1});
            }
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
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
      }}>
      <FlatList
        data={users}
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

export default SearchResultScreen;
