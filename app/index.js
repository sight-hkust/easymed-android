/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import configureStore from './store';

const onBeforeLift = () => {
  console.log('hi')
  // take some action before the gate lifts
}

const { persistor, store } = configureStore();


const Application = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<View/>} onBeforeLift={onBeforeLift}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello
        </Text>
      </View>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default Application;