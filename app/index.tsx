import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import Header from "./components/Header";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import type { LocationObjectCoords } from "expo-location";

export default function Index() {
  // >> States
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [locationAccessPermission, setLocationAccessPermission] =
    useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // >> useEffect
  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationAccessPermission(false); // Set to false if permission is denied
        return;
      }
      setLocationAccessPermission(true); // Set to true if permission is granted

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords); // Store location in state
      setLastUpdated(new Date().toLocaleTimeString()); // -> Set last updated
      // >> Reverse Geocode to get address
      let geocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (geocode.length > 0) {
        setAddress(geocode[0]); // -> Stores the geocode
      }
      console.log(address);
    };
    fetchLocation();
    const interval = setInterval(fetchLocation, 2000);
    return () => clearInterval(interval);
  }, []);
  console.log(location);
  return (
    <SafeAreaView>
      <Header />
      {!locationAccessPermission ? (
        <Text>Permission Denied</Text>
      ) : (
        <View>
          <Text>Latitude: 26.9124° N </Text>
          <Text>Longitude: 75.7873° E </Text>
          <Text>City: Jaipur </Text>
          <Text>State: Rajasthan</Text>
          <Text>Country: India </Text>
          <Text>Postal Code: 302001 </Text>
          <Text>Last Updated: 12:45 PM </Text>
          <Text>Update Frequency: 2 seconds</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
