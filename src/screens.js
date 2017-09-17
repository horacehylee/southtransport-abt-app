import React, { Component } from 'react';
import { Navigation } from "react-native-navigation"
import { Main } from "./screens/Main"
import { Theme } from "./theme"
import { TransportDepartmentNews } from "./screens/TransportDepartmentNews"
import { RTHKNews } from "./screens/RTHKNews"
import { CommericalRadioNews } from "./screens/CommericalRadioNews"

const styles = {
    statusBarColor: Theme.primaryDark,
    navBarBackgroundColor: Theme.primary,
    navBarHeight: 56,
    navBarButtonColor: "white",
    navBarTextColor: "white",
    navBarTextFontSize: 20,
}

export function registerScreens(store, provider) {
    Navigation.registerComponent("abt.main", () => screenWrapper(Main), store, provider)
    Navigation.registerComponent("abt.transportDepartmentNews", () => screenWrapper(TransportDepartmentNews), store, provider)
    Navigation.registerComponent("abt.rthkNews", () => screenWrapper(RTHKNews), store, provider)
    Navigation.registerComponent("abt.commericalRadioNews", () => screenWrapper(CommericalRadioNews), store, provider)
}

// Wrap with HOC, share screen components
function screenWrapper(WrappedComponent) {
    let wrapperClass = class extends Component {
        static navigatorStyle = { // Shared styling for all screens
            ...styles,
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
    // MERGE styles
    if (WrappedComponent.navigatorStyle) {
        wrapperClass.navigatorStyle = Object.assign(wrapperClass.navigatorStyle, WrappedComponent.navigatorStyle)
    }
    return wrapperClass
}