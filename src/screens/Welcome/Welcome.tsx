import React, { useEffect } from "react";
import {
  Text,
  View,
  ViewStyle,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { colors } from "../../styles/colors";
import { spacing } from "../../utils/Layouts";
import { fonts } from "../../styles/fonts";

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.primary,
};

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Welcome">;
}
export const Welcome = (props: Props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("Store");
    }, 3000);
  }, []);
  return (
    <View style={$container}>
      <Text
        style={{
          fontSize: 28,
          fontFamily: fonts.bold,
          color: colors.secondary,
          marginTop: spacing.large,
          paddingHorizontal: spacing.small,
        }}
      >
        Sip into happiness with our delicious bubble tea!"
      </Text>
      <Image
        source={require("./../../assets/images/welcomeImage.png")}
        style={{ width: "100%", marginTop: spacing.massive }}
        resizeMode="contain"
      />
      <StatusBar backgroundColor={colors.primary} />
    </View>
  );
};
