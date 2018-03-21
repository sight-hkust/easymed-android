import React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'

import Entrance from './Entrance'
import Triage from './Triage'
import Consultation from './Consultation'
import Login from './Login'
import Registration from './Registration'
import Pharmacy from './Pharmacy'
import PrescriptionCheckout from './PrescriptionCheckout'
import Settings from './Settings'

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Entrance} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route path="/triage" component={Triage} />
      <Route exact path="/consultation" component={Consultation} />
      <Route exact path="/pharmacy" component={Pharmacy} />
      <Route path="/pharmacy/checkout" component={PrescriptionCheckout} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;