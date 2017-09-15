import React from 'react';
import { Navigation } from "react-native-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { registerScreens } from "./screens"

registerScreens(null, null);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'abt.main', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      statusBarColor: "#00508d"
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
})

// var mapIcon;

// export default class App {
//   constructor() {
//     this._populateIcons().then(() => {
//       this.startApp();
//     }).catch((error) => {
//       console.error(error);
//     });
//   }

//   _populateIcons = function () {
//     return new Promise(function (resolve, reject) {
//       Promise.all(
//         [
//           Icon.getImageSource('map', 30),
//         ]
//       ).then((values) => {
//         mapIcon = values[0];
//         resolve(true);
//       }).catch((error) => {
//         console.log(error);
//         reject(error);
//       }).done();
//     });
//   };

//   startApp = function () {
//     Navigation.startTabBasedApp({
//       tabs: [
//         {
//           label: 'Maps', // tab label as appears under the icon in iOS (optional)
//           screen: 'abt.abtMap', // unique ID registered with Navigation.registerScreen
//           icon: mapIcon, // local image asset for the tab icon unselected state (optional on iOS)
//           // title: 'Abt Map', // title of the screen as appears in the nav bar (optional)
//           navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
//           navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
//         },
//       ]
//     });
//   }
// }