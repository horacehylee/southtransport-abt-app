import { Navigation } from "react-native-navigation"
import { Main } from "./modules/main/Main"
import TransportDepartmentNews from "./screens/TransportDepartmentNews"

export function registerScreens(store, provider) {
    Navigation.registerComponent("abt.main", () => Main)
    Navigation.registerComponent("abt.transportDepartmentNews", () => TransportDepartmentNews)
}