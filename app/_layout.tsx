import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PlaywriteITModerna-Light": require("../assets/fonts/PlaywriteITModerna-Light.ttf"),
    "PlaywriteITModerna-Regular": require("../assets/fonts/PlaywriteITModerna-Regular.ttf"),
    "PlaywriteITModerna-Thin": require("../assets/fonts/PlaywriteITModerna-Thin.ttf"),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="no-internet"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}
