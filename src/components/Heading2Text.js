import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Heading2Text = (props) => {
  return (
    <Text
      style={[props.style, styles.heading2TextStyle]}
      textBreakStrategy={'simple'}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading2TextStyle: {fontWeight: '600', fontSize: 24},
});

export default Heading2Text;
