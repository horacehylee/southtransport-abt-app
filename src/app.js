import React from 'react';
import { Navigation } from "react-native-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { registerScreens } from "./screens"
import { Theme } from "./theme"
import { Provider } from 'react-redux';
import { configureStore } from "./store"

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
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

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'abt.main', // unique ID registered with Navigation.registerScreen
  },
})