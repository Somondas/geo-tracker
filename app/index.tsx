import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import Header from "./components/Header";
import { useFonts } from "expo-font";

export default function Index() {
  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
}
