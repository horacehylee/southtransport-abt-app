import React from 'react';
import { Navigation, NativeEventsReceiver } from "react-native-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { registerScreens } from "./screens"
import { Theme } from "./theme"
import { Provider } from 'react-redux';
import { configureStore } from "./store"

import { AsyncStorage } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import isEmpty from "lodash/isEmpty"
import isEqual from "lodash/isEqual"

import AppInstall from './modules/app-install/AppInstall';
import PushNotification from './modules/pushNotification/PushNotification';

console.ignoredYellowBox = ['Setting a timer'];

// FCM.subscribeToTopic('global');
// this shall be called regardless of app state: running, background or not running. 
// Won't be called when app is killed by user in iOS
// FCM.on(FCMEvent.Notification, async (notif) => {
//   console.log("notif from global", notif)
//   // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
//   if (notif.local_notification) {
//     //this is a local notification
//   }
//   if (notif.opened_from_tray) {
//     //app is open/resumed because user clicked banner
//   }
// });

const initApp = () => {
  AppInstall.initialize().then((installId) => {
    PushNotification.getAndCheckToken(installId);
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
}
