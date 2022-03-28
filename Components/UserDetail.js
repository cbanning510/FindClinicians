import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const UserDetail = ({title = '', text}) => {
  return (
    <View style={{flexDirection: 'row', margin: 6}}>
      <Text style={styles.title}>{`${title}: `}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    marginRight: 8,
  },
});

export default UserDetail;
