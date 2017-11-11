import React from 'react';
import { Navigation, NativeEventsReceiver } from "react-native-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { registerScreens } from "./screens"
import { Theme } from "./theme"
import { Provider } from 'react-redux';
import { configureStore } from "./store"

import AppInstall from './modules/app-install/AppInstall';
import PushNotification from './modules/pushNotification/PushNotification';
import SettingsStorage from './screens/Settings/services/SettingsStorage';

import FCM, { FCMEvent } from 'react-native-fcm';
import { changeTab } from './screens/Main/actions';

console.ignoredYellowBox = ['Setting a timer'];

const initApp = () => {
  AppInstall.initialize().then((installId) => {
    PushNotification.getAndCheckToken(installId);
    SettingsStorage.init(installId);
  })
}

Promise.resolve(Navigation.isAppLaunched())
  .then(appLaunched => {
    if (appLaunched) {
      startApp(); // App is launched -> show UI
    } else {
      new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
    }
  });

function startApp() {
  const store = configureStore();

  registerScreens(store, Provider);

  initApp();

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'abt.main', // unique ID registered with Navigation.registerScreen
    },
  })

  FCM.on(FCMEvent.Notification, (notif) => {
    if (notif.opened_from_tray) {
      if (notif.icon && notif.large_icon) {
        store.dispatch(changeTab(null, 3))
      }
    }
  });
}
