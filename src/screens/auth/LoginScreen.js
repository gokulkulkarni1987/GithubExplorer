import React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import Heading1Text from '../../components/Heading1Text';
import InputComponent from '../../components/InputComponent';
import {LOGIN_ACTION} from './AuthActions';

const LoginScreen = (props) => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const onUserNameChanged = (newUsername) => {
    setUserName(newUsername);
  };

  const onPwdChanged = (newPwd) => {
    setPassword(newPwd);
  };

  const onLoginClicked = () => {
    if ((username && password) || (username !== '' && password !== '')) {
      dispatch({
        type: LOGIN_ACTION,
        payload: {
          username,
          password,
        },
      });
    }
  };

  const onRegisterClicked = () => {
    props.navigation.navigate('Register');
  };

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
        title="Register"
        buttonStyle={styles.registerButtonStyle}
        onPress={onRegisterClicked}
        buttonTextStyle={styles.registerButtonTextStyle}
      />

      <ButtonComponent
        title="Login"
        buttonStyle={styles.buttonStyle}
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
  registerButtonStyle: {
    marginTop: 10,
    backgroundColor: '#00000000',
    alignItems: 'flex-end',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderRadius: 0,
  },
  registerButtonTextStyle: {
    color: 'blue',
  },
});

export default LoginScreen;
