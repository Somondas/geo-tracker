import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import type { LocationObjectCoords } from "expo-location";
import Header from "../components/Header";
import DataListItem from "../components/DataListItem";
import { PRIMARY_WHITE } from "../constants";

export default function Index() {
  // ✅ Proper TypeScript Types
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [locationAccessPermission, setLocationAccessPermission] = useState<
    boolean | null
  >(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // ✅ useEffect to Get Location & Update Every 2 Secs
  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationAccessPermission(false);
        return;
      }
      setLocationAccessPermission(true);

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLastUpdated(new Date().toLocaleTimeString());

      // ✅ Log Immediately After Getting Data
      // console.log("Current Location:", currentLocation.coords);

      let geocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (geocode.length > 0) {
        setAddress(geocode[0]);
        console.log("Geocode Data:", geocode[0]); // ✅ Log the correct data
      }
    };

    fetchLocation(); // Initial Call
    const interval = setInterval(fetchLocation, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_WHITE }}>
      <Header />
      {locationAccessPermission === false ? (
        <Text>Permission Denied</Text>
      ) : location && address ? (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Item */}
            <DataListItem title={"Latitude"} data={location.latitude} />
            <DataListItem title={"Longitude"} data={location.longitude} />
            <DataListItem title={"City"} data={address.city || "N/A"} />
            <DataListItem title={"State"} data={address.region || "N/A"} />
            <DataListItem title={"Country"} data={address.country || "N/A"} />
            <DataListItem
              title={"Postal Code"}
              data={address.postalCode || "N/A"}
            />
            <DataListItem title={"Last Updated"} data={lastUpdated} />
            <DataListItem title={"Update Frequency"} data={"2 seconds"} />
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </SafeAreaView>
  );
}
