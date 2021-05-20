import React from 'react';
import {ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS} from '../constants';

// components
import ButtonCard from '../components/ButtonCard.js';
import LoadingIndicator from '../components/LoadingIndicator.js';
import SearchBar from '../components/SearchBar.js';

const SearchResultScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  setTimeout(() => {
    if (loading && users.length === 0) {
      props.navigation.goBack();
      props.navigation.navigate('warning', {status: 2});
    }
  }, 20000);

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
                  setUsers(
                    json.map((data, index) => {
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
                    }),
                  );
                })
                .catch(error => {
                  props.navigation.goBack();
                  return props.navigation.navigate('warning', {status: 3});
                });
            } else if (res.status === 500) {
              props.navigation.goBack();
              props.navigation.navigate('warning', {status: 1});
            }
            setLoading(false);
          })
          .catch(error => {
            props.navigation.goBack();
            return props.navigation.navigate('warning', {status: 3});
          });
      })
      .catch(error => {
        props.navigation.goBack();
        return props.navigation.navigate('warning', {status: 3});
      });
  }, []);

  const is_empty = () => {
    if (!loading && !users.length) {
      props.navigation.goBack();
      props.navigations.navigate('warning', {status: 0});
    }
  };

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
      {is_empty()}
    </>
  );
};

export default SearchResultScreen;
