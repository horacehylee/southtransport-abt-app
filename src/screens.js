import { Navigation } from "react-native-navigation"
import { Main } from "./modules/main/Main"

export function registerScreens(store, provider) {
    Navigation.registerComponent("abt.main", () => Main)
}