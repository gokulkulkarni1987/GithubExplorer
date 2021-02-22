import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Heading1Text = (props) => {
  return (
    <Text style={[props.style, styles.heading1TextStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading1TextStyle: {fontWeight: 'bold', fontSize: 24},
});

export default Heading1Text;
