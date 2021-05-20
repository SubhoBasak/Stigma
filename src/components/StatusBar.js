import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';

// icons
import IconIO from 'react-native-vector-icons/Ionicons';

// constants
import {COLORS} from '../constants';

const StatusBar = props => {
  const StatusBadge = () => {
    return (
      <Image
        style={style.status_badge}
        source={{uri: 'https://picsum.photos/128'}}
      />
    );
  };

  const all_status = [
    <StatusBadge key="status-badge-0" />,
    <StatusBadge key="status-badge-1" />,
    <StatusBadge key="status-badge-2" />,
    <StatusBadge key="status-badge-3" />,
    <StatusBadge key="status-badge-4" />,
    <StatusBadge key="status-badge-5" />,
    <StatusBadge key="status-badge-6" />,
    <StatusBadge key="status-badge-7" />,
  ];

  return (
    <View style={style.status_bar}>
      <IconIO
        style={{marginLeft: 7}}
        name="add-circle-outline"
        color={COLORS.gray_1}
        size={64}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {all_status}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  status_bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '100%',
    marginBottom: 20,
  },
  status_badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginLeft: 5,
  },
});

export default StatusBar;
