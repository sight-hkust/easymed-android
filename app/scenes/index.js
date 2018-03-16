import React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'

import Entrance from './Entrance'
import Triage from './Triage'
import Consultation from './Consultation'
import Login from './Login'
import Registration from './Registration'
import Pharmacy from './Pharmacy'
import Profile from './Triage/Profile'
import Vitals from './Triage/Vitals'
import PrescriptionCheckout from './PrescriptionCheckout'
import Settings from './Settings'

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Entrance} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route path="/triage" component={Triage} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/pharmacy" component={Pharmacy} />
      <Route path="/profile" component={Profile} />
      <Route path="/vitals" component={Vitals} />
      <Route path="/settings" component={Settings} />
      <Route path="/checkout" component={PrescriptionCheckout} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;