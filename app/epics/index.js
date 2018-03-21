import { combineEpics } from 'redux-observable';
import { registerEpic } from '../epics/auth'

export const epics = combineEpics (
    registerEpic
)

export default epics