import { IconSymbol } from "@/app-example/components/ui/IconSymbol.ios";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import {
  PRIMARY_BLUE_DARK,
  PRIMARY_BLUE_EXTRA_DARK,
  PRIMARY_BLUE_LIGHT,
  PRIMARY_BLUE_REGULAR,
  PRIMARY_WHITE,
} from "../constants";

export default function TabLayout() {
  //   const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_BLUE_EXTRA_DARK, // ✅ Active Tab Text Color
        tabBarInactiveTintColor: PRIMARY_BLUE_REGULAR, // ✅ Inactive Tab Text Color
        tabBarStyle: {
          backgroundColor: PRIMARY_BLUE_LIGHT, // ✅ Tab Bar Background Color
          borderTopWidth: 0, // ✅ Removes Default Border
          elevation: 5, // ✅ Adds Shadow for Android
          shadowOpacity: 0.2, // ✅ Adds Shadow for iOS
          paddingBottom: Platform.OS === "ios" ? 10 : 5, // ✅ Adjust Padding for iOS/Android
          height: Platform.OS === "ios" ? 80 : 60, // ✅ Adjust TabBar Height
        },
        tabBarLabelStyle: {
          fontSize: 14, // ✅ Custom Font Size
          fontFamily: "PlaywriteITModerna-Regular",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Location",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="location-pin" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map-view"
        options={{
          title: "Map View",
          tabBarIcon: ({ color }) => (
            <Entypo name="map" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
