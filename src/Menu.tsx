import { useNavigation } from "@react-navigation/core"
import React, { useLayoutEffect, useEffect, useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  ScaledSize,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native"

export default function Menu( { menuVisible, closeMenu } ) {
  const navigation = useNavigation()
  const menuVisibleRef = useRef( menuVisible )
  menuVisibleRef.current = menuVisible

  const dimensions = useDimensions()
  const { width, height } = dimensions
  const [ scaleAnimation ] = useState( new Animated.Value( 0 ) )

  useLayoutEffect(
    () => {
      if ( menuVisible ) {
        Animated.timing( scaleAnimation, {
          toValue: 100,
          useNativeDriver: true,
          duration: 250,
        } ).start()
      }
    },
    [ menuVisible ],
   )

  function onClose() {
    setTimeout( closeMenu, 350 )
    Animated.timing( scaleAnimation, {
      toValue: 0,
      useNativeDriver: true,
      duration: 250,
    } ).start()
  }

  useBackHandler( () => {
    if ( menuVisibleRef.current ) {
      closeMenu()
      return true
    }
  } )

  return menuVisible ? (
    <TouchableOpacity
      activeOpacity={ 1 }
      onPress={ onClose }
      style={ {
        position: "absolute",
        width,
        height,
        display: menuVisible ? "flex" : "none",
      } }>
      <Animated.View
        style={ [
          {
            backgroundColor: "red",
            transform: [
              {
                scale: scaleAnimation.interpolate( {
                  inputRange: [ 0, 100 ],
                  outputRange: [ 0.01, 1 ],
                } ),
              },
             ],
            opacity: scaleAnimation.interpolate( {
              inputRange: [ 0, 100 ],
              outputRange: [ 0, 1 ],
            } ),
          },
         ] }>
        <TouchableOpacity
          onPress={ () => {
            navigation.navigate( "More", { screen: "Screen0" } )
            onClose()
          } }
          style={ { padding: 10, backgroundColor: "pink" } }>
          <Text>Screen0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => {
            navigation.navigate( "More", { screen: "Screen1" } )
            onClose()
          } }
          style={ { padding: 10, backgroundColor: "pink" } }>
          <Text>Screen1</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
   ) : null
}

function useDimensions() {
  const [ dimensions, setDimensions ] = useState( Dimensions.get( "window" ) )
  useEffect( () => {
    const handler = ( { window }: { window: ScaledSize } ) =>
      setDimensions( window )
    Dimensions.addEventListener( "change", handler )
    return () => Dimensions.removeEventListener( "change", handler )
  }, [] )
  return dimensions
}

function useBackHandler( callback ) {
  useEffect(
    () => {
      return BackHandler.addEventListener( "hardwareBackPress", callback )
        .remove
    },
    [ callback ],
   )
}
