import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
export type ProductCardProps = {
  title: string;
  onPress: () => void;
  loader: boolean;
};

export const Button = (props: ProductCardProps) => {
  const { title, onPress, loader } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loader ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.buttonTxt}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonTxt: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
});
