import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Heading4Text = (props) => {
  return (
    <Text style={[props.style, styles.heading4TextStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading1TextStyle: {fontSize: 20},
});

export default Heading4Text;
