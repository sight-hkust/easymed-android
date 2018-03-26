import { combineEpics } from 'redux-observable'
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth'
import { profileEpic } from './profile'
import { vitalsEpic } from './vitals'

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    profileEpic,
    vitalsEpic
)

export default epics