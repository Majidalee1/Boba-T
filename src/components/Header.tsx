import React from "react";
import { TouchableOpacity, View } from "react-native";
import { HeaderProps } from "@rneui/themed";
import { colors } from "../styles/colors";
import { WithLocalSvg } from "react-native-svg";

export interface Props extends HeaderProps {
  data?: {
    title?: string;
  };
  actions?: {
    left?: () => void;
    right?: () => void;
  };
}

export const Header = (props?: Props) => (
  <View
    // leftComponent={<Icon
    //   name="dots-square"
    //   color={colors.primary}
    //   type="material-community"
    //   onPress={() => props?.actions?.left?.()} />}
    // centerComponent={{ text: "MY TITLE", style: { color: "#000" } }}
    // rightComponent={<Icon
    //   name="cart-minus"
    //   size={20}
    //   color={colors.primary}
    //   type="material-community"
    //   pressRetentionOffset={{
    //     bottom: 10,
    //     left: 10,
    //     right: 10,
    //     top: 10,
    //   }}
    //   onPress={() => props?.actions?.right?.()} />}
    // {...props}
    style={{
      width: "100%",
      marginTop: 10,
      marginBottom: 20,
    }}
  >
    <TouchableOpacity
      onPress={() => props?.actions?.left?.()}
      style={{
        backgroundColor: colors.white,
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        elevation: 2,
      }}
    >
      <WithLocalSvg asset={require("./../assets/icons/menu.svg")} />
    </TouchableOpacity>
  </View>
);
