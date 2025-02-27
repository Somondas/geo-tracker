import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, CalloutSubview, Marker } from "react-native-maps";
import { PRIMARY_BLUE_DARK, PRIMARY_BLUE_EXTRA_DARK } from "../constants";
import { Entypo } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
export default function MapScreen() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject} // ✅ Makes the map full-screen
        initialRegion={{
          latitude: location?.latitude || 20.5937, // Default to India
          longitude: location?.longitude || 78.9629,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
            pinColor={PRIMARY_BLUE_EXTRA_DARK}
          ></Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calloutContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  calloutDescription: {
    fontSize: 14,
  },
});
