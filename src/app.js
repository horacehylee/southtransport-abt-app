import React from 'react';
import { Navigation } from "react-native-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { registerScreens } from "./screens"
import { Theme } from "./theme"
import { Provider } from 'react-redux';
import { configureStore } from "./store"

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'abt.main', // unique ID registered with Navigation.registerScreen
  },
})