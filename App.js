/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import initRedux from './src/redux/initRedux';
import HomeScreen from './src/screens/home/HomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import './src/db/config';
import {SHARED_PREFERENCE} from './src/util/SharedPreferences';
import {SHARED_PREFERENCE_KEYS} from './src/util/AppConstants';
import AllRepos from './src/screens/home/AllRepos';
import MyBookmarked from './src/screens/home/MyBookmarked';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const listener = () => {
    const {register, login} = storeDetails.store.getState();
    console.log('storeDetails.store', storeDetails.store.getState());
    if (
      (register &&
        !register.registrationFail &&
        !register.registrationInProgress &&
        register.registrationSuccess) ||
      (login &&
        !login.loginFail &&
        !login.loginInProgress &&
        login.loginSuccess)
    ) {
      setIsSignedIn(true);
    }
  };

  SHARED_PREFERENCE.accessor
    .get(SHARED_PREFERENCE_KEYS.USER_ID)
    .then((userId) => {
      if (userId) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

  const getHome = () => (
    <Tab.Navigator>
      <Tab.Screen name="All" component={AllRepos} />
      <Tab.Screen name="Bookmarked" component={MyBookmarked} />
    </Tab.Navigator>
  );

  const storeDetails = initRedux();
  storeDetails.store.subscribe(listener);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Provider store={storeDetails.store}>
        <View style={styles.mainParentStyle}>
          <NavigationContainer>
            {isSignedIn ? (
              <>
                {/* <Stack.Navigator>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator> */}
                <Stack.Navigator>
                  <Stack.Screen name="Home" component={getHome} />
                </Stack.Navigator>
              </>
            ) : (
              <Stack.Navigator headerMode={'none'}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </View>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  mainParentStyle: {flex: 1, justifyContent: 'center', alignItems: 'stretch'},
});

export default App;
