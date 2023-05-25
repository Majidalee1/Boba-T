import { NavigationProp, RouteProp } from "@react-navigation/native";
import { TouchableOpacity, View, ViewStyle, Text } from "react-native";
import { DeviceWidth } from "../../../utils/Layouts";
import { colors } from "../../../styles/colors";
import { AppStackParamList } from "../../../navigation/AppNavigator";
import { WithLocalSvg } from "react-native-svg";
import { fonts } from "../../../styles/fonts";
import React from "react";

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  content?: Record<string, unknown>;
  name: string;
}

export const LocationHeader = (props: Props) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: DeviceWidth * 0.6,
      }}
    >
      <TouchableOpacity>
        <WithLocalSvg
          asset={require("./../../../assets/icons/storeBlack.svg")}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.text_primary,
          fontSize: 14,
          fontFamily: fonts.regular,
          flex: 1,
          marginLeft: 10,
        }}
      >
        {props.name}
      </Text>
    </View>
    <TouchableOpacity onPress={() => props.navigation.navigate("Store")}>
      <Text
        style={{
          fontSize: 14,
          color: colors.primary,
          fontFamily: fonts.regular,
          textDecorationLine: "underline",
        }}
      >
        Change
      </Text>
    </TouchableOpacity>
  </View>
);
