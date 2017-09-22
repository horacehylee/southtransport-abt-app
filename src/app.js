import React from 'react';
import { Navigation, NativeEventsReceiver } from "react-native-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { registerScreens } from "./screens"
import { Theme } from "./theme"
import { Provider } from 'react-redux';
import { configureStore } from "./store"

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
FCM.subscribeToTopic('/topics/southtransport');
// this shall be called regardless of app state: running, background or not running. 
// Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  console.log("notif from global", notif)
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if (notif.local_notification) {
    //this is a local notification
  }
  if (notif.opened_from_tray) {
    //app is open/resumed because user clicked banner
  }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log("refresh token: ", token)
  // fcm token may not be available on first load, catch it here
});

console.log("Navigation.isAppLaunched()", Navigation.isAppLaunched())
Promise.resolve(Navigation.isAppLaunched())
  .then(appLaunched => {
    console.log("App Launched", appLaunched)
    if (appLaunched) {
      startApp(); // App is launched -> show UI
    } else {
      new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
    }
  });


function startApp() {
  const store = configureStore();

  registerScreens(store, Provider);

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'abt.main', // unique ID registered with Navigation.registerScreen
    },
  })
}
