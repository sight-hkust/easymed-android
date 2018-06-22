import { createStackNavigator } from 'react-navigation';
import Entrypoint from './Entrypoint';
import Profile from './Profile';
import Vitals from './Vitals';
import ChiefComplaints from './ChiefComplaints'
import Maternal from './Maternal';
import Screening from './Screening';
import MedicalHistory from './MedicalHistory';
import Miscellaneous from './Miscellaneous';
import Menu from './Entrypoint/Menu'
import Admission from './Admission'

// const Triage = ({match}) => (
//   <Switch>
//     <Route exact path={`${match.url}`} component={Entrypoint} />
//     <Route path={`${match.url}/profile`} component={Profile} />
//     <Route path={`${match.url}/patients/admission`} component={Admission} />
//     <Route exact path={`${match.url}/patients/:queueId`} component={Menu} />
//     <Route path={`${match.url}/patients/:queueId/vitals`} component={Vitals} />
//     <Route path={`${match.url}/patients/:queueId/cheifcomplaints`} component={ChiefComplaints} />
//     <Route path={`${match.url}/patients/:queueId/maternal`} component={Maternal} />
//     <Route path={`${match.url}/patients/:queueId/screening`} component={Screening} />
//     <Route path={`${match.url}/patients/:queueId/history`} component={MedicalHistory} />
//     <Route path={`${match.url}/patients/:queueId/miscellaneous`} component={Miscellaneous} />
//   </Switch>
// )

const Triage = createStackNavigator({
  Entrypoint,
  Profile,
  Vitals,
  ChiefComplaints,
  Maternal,
  Screening,
  MedicalHistory,
  Miscellaneous,
  Menu,
  Admission
},
{
  initialRouteName: 'Entrypoint',
  headerMode: 'none'
})

export default Triage