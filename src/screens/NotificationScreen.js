import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// constants
import {COLORS, FONTS} from '../constants/index.js';

// components
import SearchBar from '../components/SearchBar.js';
import InfoCard from '../components/InfoCard.js';

const NotificationScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [allNotf, setAllNotf] = React.useState([]);
  const [realod, setReload] = React.useState(false);

  const read_api = (nid, pid) => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/notification', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({nid}),
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              setAllNotf(allNotf.filter(item => item._id !== nid));
              props.navigation.navigate('comment', {pid});
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else if (res.status === 404) {
              alert("Can't find the notification!");
              setAllNotf(allNotf.filter(item => item._id !== nid));
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

  const read_all_api = () => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/notification/all', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            if (res.status === 200) setAllNotf([]);
            else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else props.navigation.navigate('warning', {status: 1});
          })
          .catch(() => props.navigation.navigate('warning', {status: 3}));
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const InfoCardWrapper = ({item}) => {
    var img_url = base_url + '/utils/',
      notf_txt = item.name;
    if (item.status === '0') {
      img_url += 'love.png';
      notf_txt += ' love your post.';
    } else if (item.status === '1') {
      img_url += 'share.png';
      notf_txt += ' share your post.';
    } else {
      img_url += 'comment.png';
      notf_txt += ' comment on your post.';
    }
    return (
      <InfoCard
        image={img_url}
        title={notf_txt}
        body={new Date(item.createdAt).toDateString()}
        card_press={() => read_api(item._id, item.pid)}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/notification', {
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllNotf(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
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
  }, [realod]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <FlatList
        data={allNotf}
        renderItem={InfoCardWrapper}
        ListHeaderComponent={
          <>
            <SearchBar />
            <View style={style.layout}>
              <TouchableOpacity onPress={read_all_api}>
                <Text style={style.text}>Mark all as read</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(!realod)}
          />
        }
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  text: {
    fontFamily: FONTS.font_regular,
    fontSize: 16,
    color: COLORS.primary,
    marginVertical: 5,
  },
});

export default NotificationScreen;
