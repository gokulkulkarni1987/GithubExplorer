import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Heading1Text from './Heading1Text';

const RepoRowComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onRepoClicked(props.item)}>
      <View style={styles.rowStyle}>
        <Heading1Text>{props.item.name}</Heading1Text>
        <Text>{props.item.private ? 'Private' : 'Public'}</Text>
        <Text>{props.item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
});

export default RepoRowComponent;
