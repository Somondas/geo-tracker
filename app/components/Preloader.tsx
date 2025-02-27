import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { PRIMARY_WHITE } from "../constants";

export default function Preloader({ onReady }: { onReady: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // Prevent auto-hide
        // Simulate loading (e.g., fetch data, load assets, etc.)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onReady(); // Notify when ready
      } catch (e) {
        console.warn(e);
      }
    };
    loadApp();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#1e1e1e]">
      <ActivityIndicator size="large" color={PRIMARY_WHITE} />
      <Text
        className={`text-['${PRIMARY_WHITE}'] font-playwrite-regular mt-4 text-lg font-semibold`}
      >
        Loading
      </Text>
    </View>
  );
}
