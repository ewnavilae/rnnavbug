import { NavigationNativeContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect, useLayoutEffect, useRef } from "react"

import ApplicationStack from "./ApplicationStack"

const Stack = createStackNavigator()

export default function Application() {
  const navigatorRef = useRef( null )

  // This is where the application this test repro originated from would check for authentication and render the AUTH stack or the Application stack
  return (
    <NavigationNativeContainer ref={ navigatorRef }>
      <Stack.Navigator
        initialRouteName={ "Application" }
        screenOptions={ {
          headerShown: false,
        } }>
        <Stack.Screen name="Application" component={ ApplicationStack } />
      </Stack.Navigator>
    </NavigationNativeContainer>
   )
}
