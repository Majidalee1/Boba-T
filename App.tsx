import { createTheme, ThemeProvider } from "@rneui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";

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

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
