import {
  ActivityIndicator,
  Button,
  Pressable,
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
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Index() {
  // >> States
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [locationAccessPermission, setLocationAccessPermission] = useState<
    boolean | null
  >(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // >> Handle Share Function
  const handleShare = async () => {};

  // >> Use Effect
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
      <Pressable
        onPress={handleShare}
        disabled={!address}
        className={`py-3 h-15 w-2/3 mx-auto mb-4 rounded-lg ${
          !address ? "bg-slate-500" : "bg-[#415a77]"
        } `}
      >
        <Text className="text-center text-white font-semibold">
          {address ? (
            <Text className="font-playwrite-regular text-lg">
              <FontAwesome
                name="share-square-o"
                size={20}
                color={PRIMARY_WHITE}
              />{" "}
              Share Location
            </Text>
          ) : (
            "Loading Address..."
          )}
        </Text>
      </Pressable>
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
