/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { View } from 'react-native';

import Storyboard from './scenes';
import configureStore from './store';

const onBeforeLift = () => {
  console.log('hi')
  // take some action before the gate lifts
}

const { persistor, store } = configureStore();


const Application = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<View/>} onBeforeLift={onBeforeLift}>
      <Storyboard/>
    </PersistGate>
  </Provider>
);

export default Application;