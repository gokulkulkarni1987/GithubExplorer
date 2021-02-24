/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet, View, StatusBar, Alert} from 'react-native';
import {Provider} from 'react-redux';

import initRedux from './src/redux/initRedux';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import './src/db/config';
import {SHARED_PREFERENCE} from './src/util/SharedPreferences';
import {SHARED_PREFERENCE_KEYS} from './src/util/AppConstants';
import AllRepos from './src/screens/home/AllRepos';
import MyBookmarked from './src/screens/home/MyBookmarked';
import RepoDetailsScreen from './src/screens/repo/RepoDetailsScreen';
import UserImageAndLocationScreen from './src/screens/user/UserImageAndLocationScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const listener = (action) => {
    console.log('storeDetails action: ', action);
    const {register, login} = storeDetails.store.getState();
    console.log('storeDetails action: ', action);
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

  const logoutUser = async () => {
    Alert.alert('Logout!!!', 'Are you sure, you want to logout?', [
      {
        text: 'NO',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: async () => {
          await SHARED_PREFERENCE.accessor.removeAll();
          setIsSignedIn(false);
        },
      },
    ]);
  };

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
                <Stack.Navigator>
                  <Stack.Screen
                    options={{
                      headerTitle: 'Home',
                      headerRight: () => (
                        <Icon
                          name="power-off"
                          size={24}
                          color="#900"
                          style={styles.logoutIconStyle}
                          onPress={() => {
                            logoutUser();
                          }}
                        />
                      ),
                    }}
                    name="Home"
                    component={getHome}
                  />
                  <Stack.Screen
                    options={{
                      headerTitle: 'Repo Details',
                    }}
                    name="RepoDetails"
                    component={RepoDetailsScreen}
                  />
                  <Stack.Screen
                    options={{
                      headerTitle: 'User Details',
                    }}
                    name="UserImageAndLoction"
                    component={UserImageAndLocationScreen}
                  />
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
  logoutIconStyle: {
    padding: 10,
  },
});

export default App;
