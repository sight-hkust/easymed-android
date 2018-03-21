import React, { Component } from 'react';
import { Route, Switch } from 'react-router-native';
import Entrypoint from './Entrypoint';
import Checkout from './Checkout'

const Pharmacy = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Entrypoint} />
    <Route path={`${match.url}/checkout`} component={Checkout} />
  </Switch>
)

export default Pharmacy