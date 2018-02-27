import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native'

import Entrance from './Entrance'
import VitalFrom from './VitalForm'
import Consultation from './Consultation'
import Login from './Login'
import Registration from './Registration'

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Entrance} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route path="/consultation" component={Consultation} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;