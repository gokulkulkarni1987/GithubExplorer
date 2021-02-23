import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Heading2Text from './Heading2Text';

const IssueRowComponent = (props) => {
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.headingRowStyle}>
        <TouchableWithoutFeedback
          onPress={() => props.onIssuePress(props.item)}>
          <View>
            <Image
              source={{uri: props.item.user.avatar_url}}
              style={styles.imageStyle}
            />
            <Text style={styles.userNameStyle}>{props.item.user.login}</Text>
          </View>
        </TouchableWithoutFeedback>
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
  userNameStyle: {marginTop: 5, textAlign: 'center'},
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
