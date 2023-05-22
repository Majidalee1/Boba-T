import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// generate a random uuid

SplashScreen.preventAutoHideAsync();

const theme = createTheme({
  lightColors: {
    secondary: "#89CFF0",
    primary: "#fbfcff",
  },
  darkColors: {
    secondary: "#89CFF0",
    primary: "#fbfcff",
  },
});

// get or set the divice id

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
