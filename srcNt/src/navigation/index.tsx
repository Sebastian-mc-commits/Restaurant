import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import PlacesNavigation from "./places"
export default function AppNavigator(): React.JSX.Element {

  return (
    <NavigationContainer>
      <PlacesNavigation />
    </NavigationContainer>
  )
}