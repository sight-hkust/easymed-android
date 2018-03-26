import { combineEpics } from 'redux-observable';
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth'

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic
)

export default epics