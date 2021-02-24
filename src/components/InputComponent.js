import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const InputComponent = (props) => {
  return (
    <TextInput
      style={[props.style, styles.inputStyle]}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
});

export default InputComponent;
