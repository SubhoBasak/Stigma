import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../conf.js';

// icons
import IconF from 'react-native-vector-icons/Feather';

// constants
import {COLORS, FONTS} from '../constants/index.js';

// components
import SearchBar from '../components/SearchBar.js';
import StatusBar from '../components/StatusBar.js';
import PostCard from '../components/PostCard.js';

const HomeScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [allPost, setAllPost] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const all_post = [
    <PostCard
      key="post-card-1"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
    />,
    <PostCard
      key="post-card-2"
      profile="https://picsum.photos/128"
      image="https://picsum.photos/320/240"
      user="User Name"
      caps="This is a long long long post caption for testing purpose only."
      love="15K"
      comment="1K"
      share="100"
    />,
  ];

  const PostCardWrapper = ({item}) => {
    return (
      <PostCard
        profile={item.image}
        image={item.photo}
        user={item.name}
        caps={item.caption}
        love={item.loves}
        share={item.shares}
        uid={item.uid}
      />
    );
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/news_feed', {
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
          .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllPost(json))
                .catch(error =>
                  props.navigation.navigate('warning', {status: 3}),
                );
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else {
              props.navigation.navigate('warning', {status: 3});
            }
          })
          .catch(error => props.navigation.navigate('warning', {status: 3}));
      })
      .catch(error => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  }, [reload]);

  return (
    <View style={{backgroundColor: COLORS.white}}>
      <SafeAreaView>
        <FlatList
          data={allPost}
          renderItem={PostCardWrapper}
          keyExtractor={item => item.pid}
          ListHeaderComponent={() => {
            return (
              <>
                <SearchBar />
                <StatusBar />
                <View style={style.upload}>
                  <TouchableOpacity
                    style={style.upload_btn}
                    onPress={() => props.navigation.navigate('post')}>
                    <IconF style={style.upload_icon} name="upload" />
                    <Text style={style.upload_txt}>Post image</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => setReload(!reload)}
            />
          }
        />
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  upload: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  upload_btn: {
    height: 34,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginRight: 15,
    borderRadius: 17,
    borderColor: COLORS.slate_1,
    borderWidth: 1,
  },
  upload_icon: {
    fontSize: 22,
    color: COLORS.primary,
    marginRight: 5,
  },
  upload_txt: {
    fontFamily: FONTS.font_regular,
    fontSize: 18,
    color: COLORS.gray_1,
  },
});

export default HomeScreen;
