import React from 'react';
import { NativeRouter, Route } from 'react-router-native';

import VitalForm from './VitalForm';

const Storyboard = () => (
  <NativeRouter>
    <Route path="/" component={VitalForm} />
  </NativeRouter>
)

export default Storyboard;