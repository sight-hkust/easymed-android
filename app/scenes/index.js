import React from 'react';
import { NativeRouter, Route } from 'react-router-native';

import Entrance from './Entrance';

const Storyboard = () => (
  <NativeRouter>
    <Route path="/" component={Entrance} />
  </NativeRouter>
)

export default Storyboard;