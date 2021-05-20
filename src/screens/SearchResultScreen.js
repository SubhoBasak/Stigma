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
  const [users, setUsers] = React.useState([]);

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
                          body={data.body}
                        />
                      );
                    } else if (data.status === '1') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.title}
                          body={data.body}
                        />
                      );
                    } else if (data.status === '2') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.title}
                          body={data.body}
                        />
                      );
                    } else if (data.status === '3') {
                      return (
                        <ButtonCard
                          key={'srch-rslt-btn-crd-' + index}
                          image={data.image}
                          title={data.title}
                          body={data.email}
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
  }, []);

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
