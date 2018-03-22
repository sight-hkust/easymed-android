import React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'

import Login from './Login'
import Registration from './Registration'
import Entrance from './Entrance'
import Triage from './Triage'
import Consultation from './Consultation'
import Pharmacy from './Pharmacy'
import Settings from './Settings'
import Record from './Record'

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Record} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route path="/triage" component={Triage} />
      <Route exact path="/consultation" component={Consultation} />
      <Route exact path="/pharmacy" component={Pharmacy} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;