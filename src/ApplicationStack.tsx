import { NavigationProp, useNavigation } from "@react-navigation/core"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useState, useEffect, useRef } from "react"
import { Text, View } from "react-native"
import MoreStack from "./MoreStack"
import Menu from "./Menu"

function EmptyScreen() {
  useNavigation()
  return (
    <View>
      <Text>EMPTY SCREEN</Text>
    </View>
   )
}
const Stack = createNativeStackNavigator()
const Tabs = createMaterialBottomTabNavigator()

function icon( icon ) {
  return ( { focused } ) => (
    <Text style={ { color: focused ? "red" : "white", fontSize: 20 } }>
      { icon }
    </Text>
   )
}

const reduxSimulator = {
  menuVisible: false,
}

function ApplicationTabs() {
  return (
    <Tabs.Navigator
      onTabPress={ ( route ) => {
        if ( route.name === "More" ) {
          reduxSimulator.menuVisible = true
          return false
        }
      } }
      activeColor={ "red" }
      inactiveColor={ "white" }
      initialRouteName="Schedule">
      <Tabs.Screen
        name="Schedule"
        component={ EmptyScreen }
        options={ {
          tabBarIcon: icon( 0 ),
        } }
      />
      <Tabs.Screen
        name="Clients"
        component={ EmptyScreen }
        options={ {
          tabBarIcon: icon( 1 ),
        } }
      />
      <Tabs.Screen
        name="Pets"
        component={ EmptyScreen }
        options={ {
          tabBarIcon: icon( 2 ),
        } }
      />
      <Tabs.Screen
        name="Notifications"
        component={ EmptyScreen }
        options={ {
          tabBarIcon: icon( 3 ),
        } }
      />
      <Tabs.Screen
        name="More"
        component={ MoreStack }
        options={ {
          tabBarIcon: icon( 4 ),
        } }
      />
    </Tabs.Navigator>
   )
}

export default function ApplicationStack( {
  navigation,
}: {
  navigation: NavigationProp<any>
} ) {
  const [ menuVisible, setMenuVisible ] = useState( false )
  const menuVisibleRef = useRef( menuVisible )
  menuVisibleRef.current = menuVisible

  // simulates redux by checking an object and refreshing
  useEffect( () => {
    const int = setInterval( () => {
      if ( menuVisibleRef.current !== reduxSimulator.menuVisible ) {
        setMenuVisible( reduxSimulator.menuVisible )
      }
    }, 500 )
    return () => clearInterval( int )
  }, [] )

  console.log( menuVisible )

  return (
    <>
      <Stack.Navigator
        initialRouteName="ApplicationTabs"
        screenOptions={ { headerShown: false } }>
        <Stack.Screen name="ApplicationTabs" component={ ApplicationTabs } />
        <Stack.Screen name="AppointmentDetails" component={ EmptyScreen } />
        <Stack.Screen name="PrescriptionDetails" component={ EmptyScreen } />
        <Stack.Screen name="CommunicationDetails" component={ EmptyScreen } />
        <Stack.Screen name="NotificationDetails" component={ EmptyScreen } />
      </Stack.Navigator>
      <Menu
        menuVisible={ menuVisible }
        closeMenu={ () => ( reduxSimulator.menuVisible = false ) }
      />
    </>
   )
}

{
}
