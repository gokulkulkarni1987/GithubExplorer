import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Heading2Text from './Heading2Text';

const IssueRowComponent = (props) => {
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.headingRowStyle}>
        <Image
          source={{uri: props.item.user.avatar_url}}
          style={styles.imageStyle}
        />
        <Heading2Text style={styles.titleTextStyle}>
          {props.item.title}
        </Heading2Text>
      </View>
      <Text style={styles.bodyStyle}>{props.item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headingRowStyle: {
    flexDirection: 'row',
  },
  imageStyle: {width: 60, height: 60},
  titleTextStyle: {textAlign: 'center', marginLeft: 5},
  bodyStyle: {marginTop: 10},
  mainViewStyle: {
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

export default IssueRowComponent;
