import { Navigation } from "react-native-navigation"
import { Main } from "./modules/main/main"

export function registerScreens(store, provider) {
    Navigation.registerComponent("abt.main", () => Main)
}