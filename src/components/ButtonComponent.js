import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttonStyle, props.buttonStyle]}>
      <Text style={[styles.buttonTextStyle, props.buttonTextStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: '#00C853',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
  buttonTextStyle: {fontWeight: '600', fontSize: 15},
});

export default ButtonComponent;
