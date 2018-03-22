import React, { Component } from 'react';
import { Route, Switch } from 'react-router-native';
import Entrypoint from './Entrypoint';
import Profile from './Profile';
import Vitals from './Vitals';
import Pregnancy from './Pregnancy';
import Checkout from '../Pharmacy/Checkout'

const Triage = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Entrypoint} />
    <Route path={`${match.url}/vitals`} component={Vitals} />
    <Route path={`${match.url}/profile`} component={Profile} />
    <Route path={`${match.url}/pregnancy`} component={Pregnancy} />
  </Switch>
)

export default Triage