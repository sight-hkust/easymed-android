import React from 'react';
import { NativeRouter, Route } from 'react-router-native';

import Entrypoint from './Entrypoint';

const Storyboard = () => (
  <NativeRouter>
    <Route path="/" component={Entrypoint} />
  </NativeRouter>
)

export default Storyboard;