import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
export type ProductCardProps = {
  title: string;
  onPress: () => void;
};

export const Button = (props: ProductCardProps) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonTxt}>{title}</Text>
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
    marginBottom:10
  },
  buttonTxt: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
});
