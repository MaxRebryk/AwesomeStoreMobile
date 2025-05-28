import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import App from './src/modules/app/app';

LogBox.ignoreLogs(['ExceptionsManager should be set up after React DevTools']);

registerRootComponent(App);
