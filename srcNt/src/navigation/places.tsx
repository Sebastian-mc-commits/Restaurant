import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { NewPlaceScreen, PlaceDetailScreen, PlaceListScreen } from "../screens"
import RootPlacesStackParamList from "../types/stackTypes/Places.type"
import { Platform, TouchableOpacity, Text } from "react-native"
import colors from "../utils/themes/colors"

export default function PlacesNavigation(): React.JSX.Element {

  const Stack = createNativeStackNavigator<RootPlacesStackParamList>()
  //   const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  //     {
  //       name: "Places",
  //       component: Places
  //     },
  // 
  //     {
  //       name: "Place",
  //       component: Place
  //     }
  //   ]

  type PlacesProps = NativeStackScreenProps<RootPlacesStackParamList, "Places">

  return (
    <Stack.Navigator
      initialRouteName="Places"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : colors.secondary
        },
        headerTintColor: colors.black,
      }}
    >
      {/* {
        routes.map(routeConfig => (
          <Stack.Screen key={routeConfig.name} {...routeConfig} />
        ))
      } */}

      <Stack.Screen name='Places'
        component={PlaceListScreen}
        options={({ navigation }: PlacesProps) => ({
          title: "Locations",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("NewPlace")}>
              <Text>+</Text>
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name='PlaceDetail'
        component={PlaceDetailScreen}
        options={
          {
            title: "New Direction"
          }
        }
      />
      <Stack.Screen
        name='NewPlace'
        component={NewPlaceScreen}
        options={
          {
            title: "Location Details"
          }
        }
      />
    </Stack.Navigator>
  )
}