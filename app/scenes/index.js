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
import Pregnancy from './Triage/Pregnancy'
import PrescriptionCheckout from './PrescriptionCheckout'
import Settings from './Settings'

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Entrance} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route exact path="/triage" component={Triage} />
      <Route path="/triage/vitals" component={Vitals} />
      <Route path="/triage/profile" component={Profile} />
      <Route path="/triage/pregnancy" component={Pregnancy} />
      <Route exact path="/consultation" component={Consultation} />
      <Route exact path="/pharmacy" component={Pharmacy} />
      <Route path="/pharmacy/checkout" component={PrescriptionCheckout} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;