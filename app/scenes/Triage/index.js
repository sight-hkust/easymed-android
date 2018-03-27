import React, { Component } from 'react';
import { Route, Switch } from 'react-router-native';
import Entrypoint from './Entrypoint';
import Profile from './Profile';
import Vitals from './Vitals';
import Pregnancy from './Pregnancy';
import Screening from './Screening';
import MedicalHistory from './MedicalHistory';
import Menu from './Entrypoint/Menu'

const Triage = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Entrypoint} />
    <Route path={`${match.url}/profile`} component={Profile} />
    <Route exact path={`${match.url}/patients/patiendId`} component={Menu} />
    <Route path={`${match.url}/patients/:patientId/vitals`} component={Vitals} />
    <Route path={`${match.url}/patients/:patientId/pregnancy`} component={Pregnancy} />
    <Route path={`${match.url}/patients/:patientId/screening`} component={Screening} />
    <Route path={`${match.url}/patients/:patientid/history`} component={MedicalHistory} />
  </Switch>
)

export default Triage