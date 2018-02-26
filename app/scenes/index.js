import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native'

import Entrance from './Entrance'
import VitalFrom from './VitalForm'
import Triage from './Triage'
import Login from './Login'
import Registration from './Registration'

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Triage} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route path="/triage" component={Triage} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;