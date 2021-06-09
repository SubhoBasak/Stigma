import React from 'react';
import {
  View,
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
import DeleteModal from '../components/DeleteModal.js';

const HomeScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [allPost, setAllPost] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [pid, setPid] = React.useState(null);

  const love_api = pid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/news_feed', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({pid}),
        })
          .then(res => {
            if (res.status === 200) {
              setAllPost(
                allPost.map(data => {
                  if (data.pid === pid) {
                    if (data.loved) {
                      data.loved = false;
                      data.loves--;
                    } else {
                      data.loved = true;
                      data.loves++;
                    }
                  }
                  return data;
                }),
              );
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              navigation.navigate('auth');
            } else {
              navigation.navigate('warning', {status: 1});
            }
          })
          .catch(() => {
            navigation.navigate('warning', {status: 3});
          });
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        navigation.navigate('auth');
      });
  };

  const delete_api = () => {
    setDeleteModal(!deleteModal);
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/news_feed', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({pid}),
        }).then(res => {
          if (res.status === 200) {
            setAllPost(allPost.filter(data => data.pid !== pid));
          } else if (res.status === 401) {
            alert('Unauthorized User! Please login now.');
            AsyncStorage.clear();
            props.navigation.navigate('auth');
          } else {
            props.navigation.navigate('warning', {status: 1});
          }
        });
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const share_api = pid => {
    AsyncStorage.getItem('@token')
      .then(token => {
        fetch(base_url + '/post/share', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization: token},
          body: JSON.stringify({pid}),
        }).then(res => {
          if (res.status === 200) {
            setAllPost(
              allPost.map(item => {
                if (item.pid === pid) item.shares++;
                return item;
              }),
            );
          } else if (res.status === 401) {
            alert('Unauthorized User! Please login now.');
            AsyncStorage.clear();
            props.navigation.navigate('auth');
          } else if (res.status === 404) {
            alert("Couldn't found the post!");
            setAllPost(allPost.filter(item => item.pid !== pid));
          } else if (res.status === 405) {
            alert("You can't share this post!");
          } else {
            props.navigation.navigate('warning', {status: 1});
          }
        });
      })
      .catch(() => {
        alert('Unauthorized User! Please login now.');
        props.navigation.navigate('auth');
      });
  };

  const PostCardWrapper = ({item}) => {
    return (
      <PostCard
        pid={item.pid}
        profile={item.image}
        image={item.photo}
        user={item.name}
        caps={item.caption}
        love={item.loves}
        share={item.shares}
        uid={item.uid}
        loved={item.loved}
        onLove={() => love_api(item.pid)}
        onShare={() => share_api(item.pid)}
        delete_post={() => {
          setPid(item.pid);
          setDeleteModal(!deleteModal);
        }}
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
            setLoading(false);
            if (res.status === 200) {
              res
                .json()
                .then(json => setAllPost(json))
                .catch(() => props.navigation.navigate('warning', {status: 3}));
            } else if (res.status === 401) {
              alert('Unauthorized User! Please login now.');
              AsyncStorage.clear();
              props.navigation.navigate('auth');
            } else {
              props.navigation.navigate('warning', {status: 1});
            }
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
      <DeleteModal
        visible={deleteModal}
        info="Do you really want to delete this post from your news feed?"
        cancel={() => setDeleteModal(!deleteModal)}
        delete={delete_api}
      />
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
