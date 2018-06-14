import Parse from 'parse/react-native'
import { AsyncStorage } from 'react-native'

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize('bWVkZWFzeXY0', 'b1ab52dd402daf76b3e588df99ec065220e3e44a688c14e8e5408fc0fe69f133')
Parse.serverURL = 'https://api.sight.ust.hk/parse'
// Parse.serverURL = 'http://10.0.3.14/parse'

export default Parse