import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import Heading1Text from '../../components/Heading1Text';
import InputComponent from '../../components/InputComponent';

const LoginScreen = (props) => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const onUserNameChanged = (newUsername) => {
    setUserName(newUsername);
  };

  const onPwdChanged = (newPwd) => {
    setPassword(newPwd);
  };

  const onLoginClicked = () => {};

  return (
    <View style={styles.loginParentStyle}>
      <Heading1Text>Login Screen</Heading1Text>
      <InputComponent
        onChangeText={onUserNameChanged}
        placeholder={'Username'}
        value={username}
        style={styles.inputStyle}
      />

      <InputComponent
        onChangeText={onPwdChanged}
        placeholder={'Password'}
        value={password}
        secureTextEntry={true}
        style={styles.inputStyle}
      />

      <ButtonComponent
        title="Login"
        style={styles.buttonStyle}
        onPress={onLoginClicked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginParentStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  inputStyle: {marginTop: 10},
  buttonStyle: {marginTop: 10},
});

export default LoginScreen;
