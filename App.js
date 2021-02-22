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
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Realm from 'realm';

import initRedux from './src/redux/initRedux';
import HomeScreen from './src/screens/home/HomeScreen';
import UsersSchema from './src/db/schema/Users';
import GitHubReposSchema from './src/db/schema/GitHubRepos';
import LoginScreen from './src/screens/auth/LoginScreen';
const Stack = createStackNavigator();

const App = () => {
  const [realm, setRealm] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const config = {
        schema: [UsersSchema, GitHubReposSchema],
        path: './explorer/realm',
      };
      const realmVar = await Realm.open(config);
      setRealm(realmVar);
    })();
    return () => {
      if (realm) {
        realm.close();
      }
    };
  }, [realm]);

  const storeDetails = initRedux();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Provider store={storeDetails.store}>
        <View style={styles.mainParentStyle}>
          <NavigationContainer>
            {isSignedIn ? (
              <>
                <Stack.Navigator>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
              </>
            ) : (
              <Stack.Navigator headerMode={'none'}>
                <Stack.Screen name="Login" component={LoginScreen} />
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
