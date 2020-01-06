import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Text, View } from "react-native"

// import Header from "../components/Header"

const Stack = createStackNavigator()

function Screen0() {
  return (
    <View>
      <Text>Screen 0</Text>
    </View>
   )
}
function Screen1() {
  return (
    <View>
      <Text>Screen 1</Text>
    </View>
   )
}

export default function MoreStack() {
  return (
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      <Stack.Screen name="Screen0" component={ Screen0 } />
      <Stack.Screen name="Screen1" component={ Screen1 } />
    </Stack.Navigator>
   )
}
