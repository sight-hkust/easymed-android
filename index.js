import { AppRegistry } from 'react-native';
import Application from './app/index';
import {NativeModules} from 'react-native';


AppRegistry.registerComponent('Ivy', () => Application);
module.exports = NativeModules.IritechModule;
