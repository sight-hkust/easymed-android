import React, { Component } from 'react';
import { Route, Switch } from 'react-router-native';
import Entrypoint from './Entrypoint';
import Record from './Record';
import Summary from './Summary';
import Session from './Session';

const Consultation = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Entrypoint} />
    <Route exact path={`${match.url}/patients/:patientId`} component={Summary} />
    <Route exact path={`${match.url}/patients/:patientId/session`} component={Session} />
  </Switch>
)

export default Consultation