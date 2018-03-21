import React, { Component } from 'react';
import { Route, Switch } from 'react-router-native';
import Entrypoint from './Entrypoint';

const Consultation = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Entrypoint} />
  </Switch>
)

export default Consultation