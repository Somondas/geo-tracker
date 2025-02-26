import { View, Text } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className="w-full h-14  flex justify-center items-center">
      <Text
        style={{
          fontFamily: "PlaywriteITModerna-Regular",
        }}
        className="text-2xl font-playwrite-regular text-slate-800 "
      >
        Live Location Tracker
      </Text>
    </View>
  );
};

export default Header;
