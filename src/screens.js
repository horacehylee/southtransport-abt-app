import { Navigation } from "react-native-navigation"
import { AbtMap } from "./modules/map/map"
import { TransportDepartment } from "./modules/transportDepartment/transportDepartment"
import { Main } from "./modules/main/main"

export function registerScreens(store, provider) {
    Navigation.registerComponent("abt.main", () => Main)
    Navigation.registerComponent("abt.abtMap", () => AbtMap)
    Navigation.registerComponent("abt.transportDepartment", () => TransportDepartment)
}