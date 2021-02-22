/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';

import initRedux from './src/config/redux/initRedux';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator();

const App = () => {
  const storeDetails = initRedux();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Provider store={storeDetails.store}>
        <View style={styles.mainParentStyle}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
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
