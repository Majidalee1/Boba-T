import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { DeviceHeight, DeviceWidth } from "../../../utils/Layouts";
import { fonts } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";

export type ProductCardProps = {
  title: string;
  address: string;
  icon?: string;
  isSelected: boolean;
};

export const StoreCard = (props: ProductCardProps) => {
  const { title, address, icon = "heart", isSelected = false } = props;
  return (
    <View
      style={{
        width: DeviceWidth * 0.45,
        // height: DeviceWidth * 0.45,
        // height: 180,
        padding: 20,
        // marginVertical: 10,
        // marginHorizontal: 10,
        marginLeft: 15,
        borderRadius: 10,
        shadowColor: "gray",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 5,
        backgroundColor: isSelected ? "#4FB8E9" : "#fff",
        marginTop: 20,
      }}
    >
      {isSelected ? (
        <WithLocalSvg
          asset={require("./../../../assets/icons/storeWhite.svg")}
        />
      ) : (
        <WithLocalSvg asset={require("./../../../assets/icons/store.svg")} />
      )}

      <Text
        style={{
          color: isSelected ? "#fff" : "#323232",
          fontSize: 16,
          fontFamily: fonts.semiBold,
          marginTop: 20,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: isSelected ? "#FFEEE5" : "#646464",
          fontSize: 14,
          fontFamily: fonts.regular,
          marginTop: 10,
        }}
      >
        {address}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});
