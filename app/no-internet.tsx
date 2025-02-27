import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { PRIMARY_BLUE_REGULAR, PRIMARY_WHITE } from "./constants";
import Feather from "@expo/vector-icons/Feather";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "expo-router";

const NoInternet = () => {
  const navigation = useNavigation();
  const checkInternetConnection = () => {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        navigation.goBack();
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className={`w-full h-full  bg-[${PRIMARY_BLUE_REGULAR}] flex justify-center items-center`}
      >
        <Feather name="wifi-off" size={70} color={PRIMARY_WHITE} />
        <Text
          className={`font-playwrite-regular text-3xl text-['${PRIMARY_WHITE}']`}
        >
          Whoops!
        </Text>
        <Text
          className={`font-playwrite-regular text-xl text-['${PRIMARY_WHITE}']`}
        >
          No Internet connection found.
        </Text>
        <Text
          className={`font-playwrite-regular text-xl text-['${PRIMARY_WHITE}']`}
        >
          Check your connection.
        </Text>
        <Pressable
          onPress={checkInternetConnection}
          className={`py-3 mt-4 h-15 w-1/4 mx-auto mb-4 rounded-lg bg-[#e0e1dd]  `}
        >
          <Text className="text-center text-lg font-playwrite-regular text-['#415a77'] font-semibold">
            Retry
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NoInternet;
