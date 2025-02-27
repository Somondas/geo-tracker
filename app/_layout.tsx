import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PlaywriteITModerna-Light": require("../assets/fonts/PlaywriteITModerna-Light.ttf"),
    "PlaywriteITModerna-Regular": require("../assets/fonts/PlaywriteITModerna-Regular.ttf"),
    "PlaywriteITModerna-Thin": require("../assets/fonts/PlaywriteITModerna-Thin.ttf"),
  });

  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible
      if (fontsLoaded) {
        setAppLoaded(true);
        await SplashScreen.hideAsync(); // Hide splash screen after loading
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded || !appLoaded) {
    return <Preloader onReady={() => setAppLoaded(true)} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="no-internet" options={{ headerShown: false }} />
    </Stack>
  );
}
