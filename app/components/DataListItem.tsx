import { View, Text } from "react-native";
import React from "react";

const DataListItem = ({ title, data }) => {
  return (
    <>
      {/* Item */}
      <View className="px-3 py-5 mx-2 my-1 bg-[#1b263b] rounded-lg shadow-md">
        <Text className="font-playwrite-regular text-lg text-[#778da9]">
          {title}:
        </Text>
        <Text className="text-center font-playwrite-regular text-xl text-['#e0e1dd'] ">
          {data}
        </Text>
      </View>
    </>
  );
};

export default DataListItem;
