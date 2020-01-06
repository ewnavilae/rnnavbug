/**
 * @format
 */

console.disableYellowBox = true

import { AppRegistry } from "react-native"
import { enableScreens } from "react-native-screens"

import { name as appName } from "./app.json"
import App from "./src/Application"

enableScreens()
AppRegistry.registerComponent( appName, () => App )
