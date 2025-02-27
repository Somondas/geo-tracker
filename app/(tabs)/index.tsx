import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import type { LocationObjectCoords } from "expo-location";
import Header from "../components/Header";
import DataListItem from "../components/DataListItem";
import NetInfo from "@react-native-community/netinfo";
import {
  PRIMARY_BLUE_EXTRA_DARK,
  PRIMARY_BLUE_LIGHT,
  PRIMARY_BLUE_REGULAR,
  PRIMARY_WHITE,
} from "../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import * as Battery from "expo-battery";
export default function Index() {
  // >> States
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [locationAccessPermission, setLocationAccessPermission] = useState<
    boolean | null
  >(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [intervalTime, setIntervalTime] = useState(2000);
  const router = useRouter();

  // >> Handle Share Function
  const handleShare = async () => {
    try {
      if (!address) return;
      const formattedAddress = `Name: ${address.name || ""}\nCity: ${
        address.city || ""
      }\nState: ${address.region || ""}\nPostal Code: ${
        address.postalCode || ""
      }\nCountry: ${address.country || ""}\nSub-region: ${
        address.subregion || ""
      }  `;
      // const formattedAddress = address.formattedAddress;
      await Share.share({
        message: `📍 Location Details:\n${formattedAddress}\nLatitude: ${location?.latitude},\nLongitude: ${location?.longitude}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed");
    }
  };

  // >> useEffect for checking internet connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        router.push("/no-internet");
      }
    });
    return () => unsubscribe();
  }, []);
  // >> useEffect to get battery level
  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level * 100);
    };

    fetchBatteryLevel();
    const batteryInterval = setInterval(fetchBatteryLevel, 10000);
    return () => clearInterval(batteryInterval);
  }, []);
  // >> fetchLocation function
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
      // console.log("Geocode Data:", geocode[0]); // Log the  data
    }
    // console.log("done");
  };
  // >> Use Effect to get location (the main useEffect)
  useEffect(() => {
    fetchLocation(); // Initial Call
    if (batteryLevel !== null && batteryLevel < 20) {
      setIntervalTime(5000);
    }
    setIntervalTime(2000);
    // const intervalTime =
    //   batteryLevel !== null && batteryLevel < 20 ? 5000 : 2000; // this slow the update time if the battery percentange is less that 20%
    const interval = setInterval(fetchLocation, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_WHITE }}>
      <Header />
      <Pressable
        onPress={fetchLocation}
        // disabled={!address}
        className={`py-3 h-15 w-2/3 mx-auto mb-4 rounded-lg bg-[#415a77] `}
      >
        <Text className="text-center text-white font-semibold">
          <Text className="font-playwrite-regular text-lg">
            <FontAwesome name="refresh" size={20} color={PRIMARY_WHITE} />{" "}
            Refresh
          </Text>
        </Text>
      </Pressable>
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
        <View
          className={`w-11/12 h-3/5 mx-auto flex justify-center items-center my-auto bg-[${PRIMARY_BLUE_REGULAR}]`}
        >
          <MaterialIcons name="error-outline" size={60} color={PRIMARY_WHITE} />
          <Text
            className={`text-2xl font-playwrite-regular text-['${PRIMARY_WHITE}'] `}
          >
            Permission Denied
          </Text>
        </View>
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
            <DataListItem
              title={"Update Frequency"}
              data={`${intervalTime / 1000} seconds`}
            />
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator size="large" color={PRIMARY_BLUE_EXTRA_DARK} />
      )}
    </SafeAreaView>
  );
}
