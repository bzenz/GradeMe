import { registerRootComponent } from 'expo';

import App from './App';

export const SERVER = window.location.hostname === "localhost" ? "http://localhost:5000":"";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
